import { Service, Singleton } from 'egg';
import { Redis } from 'ioredis';

export default class BaseService extends Service {

  /**
   * 所有实体会加载在ctx.entities中, 所有仓库会加载到ctx.repo;
   * 多数据库时加载在对应的ctx.entities[connectName]与ctx.repo[connectionName]上;
   * 详见typings/typeorm.d.ts文件
   */
  getRepo() {
    return this.ctx.repo;
  }

  getEntity() {
    return this.ctx.entity;
  }

  /**
   * 获取Helper
   */
  getHelper() {
    return this.ctx.helper;
  }

  /**
   * admin redis
   */
  getAdminRedis() {
    return ((this.app.redis as Singleton<Redis>).get('admin'));
  }

}
