import BaseService from '../../base';

/**
 * 任务调度服务
 */
export default class SysTaskService extends BaseService {

  /**
   * 记录任务日志
   */
  async record(tid: number, status: number) {
    const result = await this.getRepo().admin.sys.TaskLog.save({
      taskId: tid,
      status,
    });
    return result.id;
  }

  async updateTaskStatus(id: number, status: number, detail?: string) {
    this.getRepo().admin.sys.TaskLog.update(id, {
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
    // const result = await this.getRepo().admin.sys.TaskLog.find({
    //   order: {
    //     id: 'DESC',
    //   },
    //   take: count,
    //   skip: page * count,
    // });
    // return result;
    const result = await this.getRepo().admin.sys.TaskLog.createQueryBuilder('task_log')
      .leftJoinAndSelect('sys_task', 'task', 'task_log.task_id = task.id')
      .orderBy('task_log.id', 'DESC')
      .offset(page * count)
      .limit(count)
      .getRawMany();
    return result.map(e => {
      return {
        id: e.task_log_id,
        taskId: e.task_id,
        name: e.task_name,
        createTime: e.task_log_createTime,
        finishTime: e.task_log_updateTime,
        detail: e.task_log_detail,
        status: e.task_log_status,
      };
    });
  }

  /**
   * 清空表中的所有数据
   */
  async clear() {
    await this.getRepo().admin.sys.TaskLog.clear();
  }

}
