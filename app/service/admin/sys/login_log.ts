import BaseService from '../../base';
import { UAParser } from 'ua-parser-js';

/**
 * 登录日志服务
 */
export default class SysLoginLogService extends BaseService {

  /**
   * 记录登录日志
   */
  async save(id: number) {
    await this.getRepo().admin.sys.LoginLog.save({
      ip: this.getHelper().getReqIP(),
      userId: id,
      ua: this.ctx.get('user-agent'),
      time: new Date(),
    });
  }

  /**
   * 计算日志总数
   */
  async count() {
    return await this.getRepo().admin.sys.LoginLog.count();
  }

  /**
   * 分页加载日志信息
   */
  async page(page: number, count: number) {
    const result = await this.getRepo().admin.sys.LoginLog.find({
      order: {
        id: 'DESC',
      },
      take: count,
      skip: page * count,
    });
    const parser = new UAParser();
    return result.map(e => {
      const u = parser.setUA(e.ua).getResult();
      return {
        id: e.id,
        ip: e.ip,
        os: u.os.name,
        browser: u.browser.name,
      };
    });
  }

}
