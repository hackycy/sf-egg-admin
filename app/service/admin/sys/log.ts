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

  /**
   * 计算日志总数
   */
  async count() {
    return await this.getRepo().admin.sys.Log.count();
  }

  /**
   * 分页加载日志信息
   */
  async page(page: number, count: number) {
    const result = await this.getRepo().admin.sys.Log.find({
      order: {
        id: 'DESC',
      },
      take: count,
      skip: page * count,
    });
    return result;
  }

}
