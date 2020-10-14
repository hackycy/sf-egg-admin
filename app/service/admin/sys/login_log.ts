import BaseService from '../../base';
import { UAParser } from 'ua-parser-js';
import * as moment from 'moment';

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
    // const result = await this.getRepo().admin.sys.LoginLog.find({
    //   order: {
    //     id: 'DESC',
    //   },
    //   take: count,
    //   skip: page * count,
    // });
    const result = await this.getRepo().admin.sys.LoginLog.createQueryBuilder('login_log')
      .innerJoinAndSelect('sys_user', 'user', 'login_log.user_id = user.id')
      .orderBy('login_log.time', 'DESC')
      .skip(page * count)
      .take(count)
      .getRawMany();
    this.ctx.logger.info(result);
    const parser = new UAParser();
    return result.map(e => {
      const u = parser.setUA(e.login_log_ua).getResult();
      return {
        id: e.login_log_id,
        ip: e.login_log_ip,
        os: `${u.os.name} ${u.os.version}`,
        browser: `${u.browser.name} ${u.browser.version}`,
        time: moment(e.login_log_time).format('YYYY-MM-DD HH:mm:ss'),
        username: e.user_username,
      };
    });
  }

}
