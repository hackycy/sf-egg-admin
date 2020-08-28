import { Context } from 'egg';
import * as _ from 'lodash';

// 无需token的地址
const noTokenUrl = [
  '/admin/comm/captcha/img',
  '/admin/login' ];

export default function adminAuthority(): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    const { url } = ctx;
    let statusCode = 200;
    let errorCode = 0;
    const token = ctx.get('Authorization');
    if (_.startsWith(url, '/admin')) {
      if (noTokenUrl.includes(url.split('?')[0])) {
        await next();
        return;
      }
      try {
        ctx.user = ctx.helper.jwtVerify(token);
        if (ctx.user) {
          const pv = ctx.app.redis.get('admin').get(`admin:pv:${ctx.user.uid}`);
          if (pv !== ctx.user.pv) {
            // 判断密码版本，防止登录时更改密码还在允许使用
            errorCode = 11002;
            statusCode = 401;
          } else {
            const redisToken = ctx.app.redis.get('admin').get(`admin:token:${ctx.user.uid}`);
            // 查询token是否一致
            if (token !== redisToken) {
              errorCode = 11002;
              statusCode = 401;
            } else {
              // 挂载当前角色权限
              ctx.role = await ctx.service.admin.sys.role.getByUser(ctx.user.uid);
              // 遍历权限是否包含该url，不包含则无访问权限
            }
          }
        }
      } catch (e) {
        statusCode = 401;
        errorCode = 11001;
      }
      if (statusCode > 200) {
        ctx.status = statusCode;
        ctx.body = {
          code: errorCode,
          message: ctx.helper.getErrorMessageByCode(`${errorCode}`),
        };
        return;
      }
    } else {
      // 不是admin开头的放过
      await next();
    }
  };
}
