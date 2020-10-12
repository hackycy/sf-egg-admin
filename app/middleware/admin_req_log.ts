import { Context } from 'egg';

/**
 * 日志中间件，记录请求
 */
export default function adminReqLog(): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    const { url } = ctx;
    // 该接口不做记录/admin/sys/log/page
    if (url.startsWith('/admin') && !url.startsWith('/admin/sys/log/page')) {
      // TODO status 不一定准确，当抛出异常时执行顺序这里就是错误的了
      ctx.service.admin.sys.reqLog.save(url.split('?')[0],
        ctx.req.method === 'GET' ? ctx.request.query : ctx.request.body, ctx.status, ctx.req.method, ctx.token ? ctx.token.uid : null);
    }
    await next();
  };
}
