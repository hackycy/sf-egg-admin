import { Middleware } from 'koa';
import { Application, Context } from 'egg';

/**
 * 记录各个routerUrl的路由配置，使用initRouter统一设置
 */
const __router__: any = {};

/**
 * egg suport http method
 */
export type HttpMethod = 'get' | 'post' | 'patch' | 'delete' | 'options' | 'put' | 'all';

/**
 * RouterOption
 */
interface RouterOption {
  httpMethod: HttpMethod;
  handleName: string;
  beforeMiddlewares: Middleware[];
  constructorFn: any;
  className: string;
  url: string;
}

/**
 * 推入路由配置
 */
function _setRouter(url: string, option: RouterOption) {
  __router__[url] = __router__[url] || [];
  __router__[url].push(option);
}

/**
 * 注册路由，路由信息是通过装饰器收集的
 * router.head - HEAD
 * router.options - OPTIONS
 * router.get - GET
 * router.put - PUT
 * router.post - POST
 * router.patch - PATCH
 * router.delete - DELETE
 * router.del - 由于 delete 是一个保留字，所以提供了一个 delete 方法的别名。
 * router.redirect - 可以对 URL 进行重定向处理，比如我们最经常使用的可以把用户访问的根目录路由到某个主页。
 * @param app Application
 */
export function initRouter(app: Application) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { router } = app;
  Object.keys(__router__).forEach(url => {
    __router__[url].forEach((opt: RouterOption) => {
      router[opt.httpMethod](opt.url, ...opt.beforeMiddlewares, async (ctx: Context) => {
        const ist = new opt.constructorFn(ctx);
        await ist[opt.handleName](ctx);
      });
    });
  });
}

/**
 * 收集路由信息，使用@Route装饰器
 */
export function Route(url: string, method: HttpMethod, ...beforeMiddlewares: Middleware[]) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return function(target: any, funcName: string, _descriptor: PropertyDescriptor) {
    const option = {
      httpMethod: method,
      beforeMiddlewares,
      handleName: funcName,
      constructorFn: target.constructor,
      className: target.constructor.name,
      url,
    };
    _setRouter(url, option);
  };
}

