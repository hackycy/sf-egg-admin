import { Context } from 'egg';

/**
 * 日志中间件，记录请求
 */
export default function adminReqLog(): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    const { url } = ctx;
    // 该接口不做记录/admin/sys/log/page
    if (url.startsWith('/admin') && !url.startsWith('/admin/sys/log/page')) {
      ctx.service.admin.sys.reqLog.save(url.split('?')[0],
        ctx.req.method === 'GET' ? ctx.request.query : ctx.request.body, ctx.req.method, ctx.token ? ctx.token.uid : null);
    }
    await next();
  };
}
