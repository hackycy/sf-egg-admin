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

}
