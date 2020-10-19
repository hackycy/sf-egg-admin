import BaseService from '../../base';

/**
 * 任务调度服务
 */
export default class SysTaskService extends BaseService {

  /**
   * 记录任务日志
   */
  async record(tid: number, status: number, detail?: string) {
    await this.getRepo().admin.sys.TaskLog.insert({
      taskId: tid,
      status,
      detail,
    });
  }

  /**
   * 计算日志总数
   */
  async count() {
    return await this.getRepo().admin.sys.TaskLog.count();
  }

  /**
   * 分页加载日志信息
   */
  async page(page: number, count: number) {
    const result = await this.getRepo().admin.sys.TaskLog.find({
      order: {
        id: 'DESC',
      },
      take: count,
      skip: page * count,
    });
    return result;
  }

  /**
   * 清空表中的所有数据
   */
  async clear() {
    await this.getRepo().admin.sys.TaskLog.clear();
  }

}
