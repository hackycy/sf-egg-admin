import BaseService from '../../base';

/**
 * 系统日志服务
 */
export default class SysLogService extends BaseService {

  /**
   * 记录日志
   */
  async save(url: string, params: string, userId: number) {
    const ip = this.getHelper().getReqIP();
    await this.getRepo().admin.sys.Log.insert({
      action: url,
      params: JSON.stringify(params),
      userId,
      ip,
    });
  }

}
