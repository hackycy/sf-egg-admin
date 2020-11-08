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
    // const result = await this.getRepo().admin.sys.LoginLog.find({
    //   order: {
    //     id: 'DESC',
    //   },
    //   take: count,
    //   skip: page * count,
    // });
    const result = await this.getRepo().admin.sys.LoginLog.createQueryBuilder('login_log')
      .innerJoinAndSelect('sys_user', 'user', 'login_log.user_id = user.id')
      .orderBy('login_log.createTime', 'DESC')
      .offset(page * count)
      .limit(count)
      .getRawMany();
    const parser = new UAParser();
    return result.map(e => {
      const u = parser.setUA(e.login_log_ua).getResult();
      return {
        id: e.login_log_id,
        ip: e.login_log_ip,
        os: `${u.os.name} ${u.os.version}`,
        browser: `${u.browser.name} ${u.browser.version}`,
        time: e.login_log_createTime,
        username: e.user_username,
      };
    });
  }

  /**
   * 清空表中的所有数据
   */
  async clear() {
    await this.getRepo().admin.sys.LoginLog.clear();
  }

}
