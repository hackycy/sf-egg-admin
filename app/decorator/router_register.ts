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
  validation?: Validation | undefined | null;
  url: string;
}

interface Validation {
  query?: any;
  body?: any;
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
        // if (opt.validation) {
        //   if (opt.httpMethod === 'get') {
        //     const query = opt.validation.query ? await ctx.validate(opt.validation.query, ctx.request.query) : null;
        //     await ist[opt.handleName].call(ist, query);
        //   } else {
        //     const query = opt.validation.query ? await ctx.validate(opt.validation.query, ctx.request.query) : null;
        //     const body = opt.validation.body ? await ctx.validate(opt.validation.body, ctx.request.body) : null;
        //     await ist[opt.handleName].call(ist, body, query);
        //   }
        // } else {
        //   await ist[opt.handleName].call(ist);
        // }
        await ist[opt.handleName].call(ist);
      });
    });
  });
}

// /**
//  * Body 参数校验
//  * @param type dto type
//  */
// export function Body(type: any) {
//   return function(target: any, propertName: string, index: number) {
//     if (!target.validatorBody) {
//       target.validatorBody = {};
//     }
//     if (!target.validatorBody[propertName]) {
//       target.validatorBody[propertName] = [];
//     }
//     target.validatorBody[propertName].push({ pk: propertName, index, type });
//   };
// }

// /**
//  * Query 参数校验
//  * @param type dto type
//  */
// export function Param(type: any) {
//   return function(target: any, propertName: string, index: number) {
//     if (!target.validatorParam) {
//       target.validatorParam = {};
//     }
//     target.validatorParam[propertName] = { pk: propertName, index, type };
//   };
// }

/**
 * 收集路由信息，使用@Route装饰器
 */
export function Route(url: string, method: HttpMethod, validation?: Validation, ...beforeMiddlewares: Middleware[]) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return function(target: any, funcName: string, _descriptor: PropertyDescriptor) {
    _setRouter(url, {
      httpMethod: method,
      beforeMiddlewares,
      handleName: funcName,
      constructorFn: target.constructor,
      className: target.constructor.name,
      validation: validation ?? null,
      url,
    });
  };
}


const PREFIX_ADMIN = '/admin';
/**
 * 自动添加/admin前缀的Url路由装饰器
 * 例如 url 为 /sys/user/add, 使用该装饰器可直接变为/admin/sys/user/add
 */
export function AdminRoute(url: string, method: HttpMethod, validation?: Validation, ...beforeMiddlewares: Middleware[]) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return function(target: any, funcName: string, _descriptor: PropertyDescriptor) {
    _setRouter(url, {
      httpMethod: method,
      beforeMiddlewares,
      handleName: funcName,
      constructorFn: target.constructor,
      className: target.constructor.name,
      validation: validation ?? null,
      url: `${PREFIX_ADMIN}${url}`,
    });
  };
}

