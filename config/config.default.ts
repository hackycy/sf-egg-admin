import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import * as path from 'path';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1597893009804_8539';

  // add your egg config in here
  config.middleware = [ 'notfoundHandler' ];

  /**
   * 框架内置了国际化（I18n）支持，由 egg-i18n 插件提供。
   * 更多配置参考 @{Link:https://github.com/eggjs/egg-i18n}
   */
  config.i18n = {
    defaultLocale: 'zh-CN',
  };

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // https://eggjs.org/zh-cn/core/security.html
  config.security = {
    csrf: {
      // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
      enable: false,
      ignoreJSON: true,
    },
  };

  // static config
  config.static = {
    prefix: '/',
    dir: path.join(appInfo.baseDir, 'app/public'),
    dynamic: true,
    preload: false,
    // maxAge: 31536000,
    maxAge: 0,
    buffer: false,
  };

  // https://eggjs.org/zh-cn/core/error-handling.html
  config.onerror = {
    all(err: any, ctx: any) {
      // 在此处定义针对所有响应类型的错误处理方法
      // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
      ctx.set('Content-Type', 'application/json');
      // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      const status = err.status || 500;
      const message = status === 500 && ctx.app.config.env === 'prod' ? 'Server internal exception, please try again later' : err.message;
      ctx.body = JSON.stringify({
        errorCode: err.errorCode || 500,
        message,
      });
    },
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
