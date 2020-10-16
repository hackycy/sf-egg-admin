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
   * 清空表中的所有数据
   */
  async clear() {
    await this.getRepo().admin.sys.Task.clear();
    // 清除5秒以前完成的所有完成的作业。
    await this.app.queue.sys.clean(5000, 'completed');
  }

}
