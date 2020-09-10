import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import * as path from 'path';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1597893009804_8539';

  // add your egg config in here
  config.middleware = [ 'adminAuthority', 'notfoundHandler' ];

  config.aesSecret = {
    admin: 'hXuLvp6zmhahtW1kf21DpYxm',
    front: 'eECRYHR5Er93BijVlkMz9CIn',
  };

  config.jwt = {
    secret: 'INnyQ50BEE6AITQraIaDGooJ',
  };

  /**
   * 邮件推送配置
   */
  config.mailer = {
    host: 'smtpdm.aliyun.com',
    port: 25,
    user: 'noreply@mail.si-yee.com',
    pass: 'ZJyzy5201314',
    secure: false,
  };

  /**
   * 七牛配置
   */
  config.qiniu = {
    accessKey: '_MkCZiF7CrlkVVevh9JA2YtBnThz6dAXdSNA-Km4',
    secretKey: '8TFReK-x3Mu0p4SK4lRt9dFPNLJwRXF5H0d1s-f2',
    bucket: 'siyee',
    cdnUrl: 'http://image.si-yee.com',
    zone: 'Zone_z2',
  };

  // Root角色对应ID
  config.rootRoleId = 1;
  // Root角色对应账户
  config.rootUserName = 'hackycy';

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
    // 配合egg-cors使用
    domainWhiteList: [ 'http://localhost:7003' ],
    csrf: {
      // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
      enable: false,
      ignoreJSON: true,
    },
  };

  /**
   * egg-global-header
   * https://github.com/eggjs/egg-global-header
   */
  config.globalHeader = {
    'Powered-by': 'siyee',
  };

  /**
   * CORS
   * https://github.com/eggjs/egg-cors
   */
  config.cors = {
    // origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
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

  /**
   * https://eggjs.org/zh-cn/basics/controller.html#获取上传的文件
   */
  config.multipart = {
    mode: 'file',
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
