import BaseService from '../../base';

/**
 * 请求追踪服务
 */
export default class SysReqLogService extends BaseService {

  /**
   * 记录日志
   */
  async save(url: string, params: string, status: number, consumeTime: number, method: string | undefined, userId: number | null) {
    const ip = this.getHelper().getReqIP();
    await this.getRepo().admin.sys.ReqLog.insert({
      action: url,
      params: JSON.stringify(params),
      userId: userId === null ? undefined : userId,
      ip,
      method: method ? method.toUpperCase() : undefined,
      status,
      consumeTime,
    });
  }

  /**
   * 计算日志总数
   */
  async count() {
    return await this.getRepo().admin.sys.ReqLog.count();
  }

  /**
   * 分页加载日志信息
   */
  async page(page: number, count: number) {
    const result = await this.getRepo().admin.sys.ReqLog.find({
      order: {
        id: 'DESC',
      },
      take: count,
      skip: page * count,
    });
    return result;
  }

  /**
   * 分页查询
   */
  async search(page: number, count: number, q: string) {
    const allResult = await this.getRepo().admin.sys.ReqLog.createQueryBuilder('req_log')
      .where(`req_log.userId LIKE '%${q}%'`)
      .orWhere(`req_log.ip LIKE '%${q}%'`)
      .orWhere(`req_log.action LIKE '%${q}%'`)
      .orWhere(`req_log.params LIKE '%${q}%'`)
      .getMany();
    const result = await this.getRepo().admin.sys.ReqLog.createQueryBuilder('req_log')
      .where(`req_log.userId LIKE '%${q}%'`)
      .orWhere(`req_log.ip LIKE '%${q}%'`)
      .orWhere(`req_log.action LIKE '%${q}%'`)
      .orWhere(`req_log.params LIKE '%${q}%'`)
      .skip(page * count)
      .take(count)
      .getMany();
    return {
      count: allResult.length,
      logs: result,
    };
  }

  /**
   * 清空表中的所有数据
   */
  async clear() {
    await this.getRepo().admin.sys.ReqLog.clear();
  }

}
