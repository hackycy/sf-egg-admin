import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};

  /**
   * typeorm 配置
   * 文档：https://www.npmjs.com/package/egg-ts-typeorm
   */
  config.typeorm = {
    client: {
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'siyee-api',
      synchronize: false,
      logging: true,
    },
  };

  /**
   * redis 配置
   * https://github.com/eggjs/egg-redis
   */
  config.redis = {
    clients: {
      // instanceName. See below
      admin: {
        port: 6379,
        host: '127.0.0.1',
        password: '123456',
        db: 0,
      },
      app: {
        port: 6379,
        host: '127.0.0.1',
        password: '123456',
        db: 1,
      },
    },
  };

  return config;
};
