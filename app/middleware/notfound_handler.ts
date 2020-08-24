import { Context } from 'egg';

// 这里是你自定义的中间件
export default function notfoundHandler(): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    // 你可以获取 config 的配置：
    // const config = ctx.app.config;
    // config.xxx....
    await next();
    if (ctx.status === 404 && !ctx.body) {
      throw Error('404 Not Found');
    }
  };
}
