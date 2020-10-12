import BaseService from '../../base';

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
    const users = await this.service.admin.sys.user.infoList(formatNumberIds);
    return users.map(e => {
      return {
        isCurrent: this.ctx.token.uid === e.id,
        username: e.username,
        status: 1, // 1为在线，2为异常(有可能Token失效但是redis还未清理)
        updateTime: e.updateTime,
        createTime: e.createTime,
        ip: this.ctx.token.uid === e.id ? this.ctx.helper.getReqIP() : null, // 目前只能查看当前ip
      };
    });
  }

}
