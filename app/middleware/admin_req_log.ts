import { Context } from 'egg';

/**
 * 日志中间件，记录请求
 */
export default function AdminReqLog(): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    const startTime = Date.now();
    await next();
    const reportTime = Date.now() - startTime;
    const { url } = ctx;
    // 该接口不做记录/admin/sys/log/page
    if (url.startsWith('/admin') && !url.startsWith('/admin/sys/req-log/page')) {
      ctx.service.admin.sys.reqLog.save(url.split('?')[0],
        ctx.req.method === 'GET' ? ctx.request.query : ctx.request.body, ctx.status, reportTime, ctx.req.method, ctx.token ? ctx.token.uid : null);
    }
  };
}
