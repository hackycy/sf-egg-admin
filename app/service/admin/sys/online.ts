import BaseService from '../../base';
import * as moment from 'moment';

/**
 * 在线用户控制器
 */
export default class SysOnlineService extends BaseService {

  async list() {
    const onlineUserIds: string[] = await this.app.redis.get('admin').keys('admin:token:*');
    const formatNumberIds: number[] = onlineUserIds.map(e => {
      const uid = e.split('admin:token:')[1];
      return parseInt(uid);
    });
    return await this.findLastLoginInfo(formatNumberIds);
  }

  /**
   * 根据用户id列表查找最近登录信息和用户信息
   */
  async findLastLoginInfo(ids: number[]) {
    const result = await this.ctx.ormManager.query(`
    SELECT n.*, u.username
      FROM sys_login_log n
      INNER JOIN (
        SELECT user_id, MAX(time) AS time
        FROM sys_login_log GROUP BY user_id
      ) AS max USING (user_id, time)
      INNER JOIN sys_user u ON n.user_id = u.id
      WHERE n.user_id IN (?)
    `, [ ids ]);
    if (result) {
      return result.map(e => {
        return {
          id: e.user_id,
          ip: e.ip,
          username: e.username,
          isCurrent: this.ctx.token.uid === e.user_id,
          time: moment(e.time).format('YYYY-MM-DD HH:mm:ss'),
          status: 1,
          ua: e.ua,
        };
      });
    }
    return [];
  }

}
