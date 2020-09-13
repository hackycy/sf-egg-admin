import { Context } from 'egg';

/**
 * 日志中间件，记录请求
 */
export default function adminLog(): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    const { url } = ctx;
    ctx.service.admin.sys.log.save(url.split('?')[0], ctx.req.method === 'GET' ? ctx.request.query : ctx.request.body, ctx.token ? ctx.token.uid : null);
    await next();
  };
}
