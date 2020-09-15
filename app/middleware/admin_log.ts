import { Context } from 'egg';

/**
 * 日志中间件，记录请求
 */
export default function adminLog(): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    const { url } = ctx;
    // 该接口不做记录/admin/sys/log/page
    if (url.startsWith('/admin') && !url.startsWith('/admin/sys/log/page')) {
      ctx.service.admin.sys.log.save(url.split('?')[0], ctx.req.method === 'GET' ? ctx.request.query : ctx.request.body, ctx.token ? ctx.token.uid : null);
    }
    await next();
  };
}
