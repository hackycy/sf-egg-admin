import { Context } from 'egg';
import * as _ from 'lodash';

// 无需token的地址
const noTokenUrl = [
  '/admin/captcha/img',
  '/admin/login',
];


/**
 * Admin权限验证中间件，只检测/admin开头请求
 * Token验证通过会把当前系统用户uid挂载到ctx上
 */
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
              // 遍历权限是否包含该url，不包含则无访问权限
              let perms = ctx.app.redis.get('admin').get(`admin:perms:${ctx.user.uid}`);
              if (_.isEmpty(perms)) {
                errorCode = 11001;
                statusCode = 403;
              } else {
                // 将sys:admin:user等转换成sys/admin/user
                perms = JSON.parse(perms).map(e => {
                  return e.replace(/:/g, '/');
                });
                if (!perms.includes(url.split('?')[0].replace('/admin/', ''))) {
                  errorCode = 11001;
                  statusCode = 403;
                }
              }
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
    }
    // has perms, pass
    await next();
  };
}
