import BaseService from '../../base';
import { CreateTaskDto, UpdateTaskDto } from '../../../dto/admin/sys/task';
import SysTask from '../../../entities/admin/sys/task';

/**
 * 任务调度服务
 */
export default class SysTaskService extends BaseService {

  /**
   * 初始化任务，系统启动前调用
   */
  async initTask() {
    // 查找所有需要运行的任务
    const tasks = await this.getRepo().admin.sys.Task.find({ status: 1 });
    if (tasks && tasks.length > 0) {
      for (const t of tasks) {
        const exist = await this.existJob(String(t.id));
        if (!exist) {
          this.start(t);
        }
      }
    }
  }

  /**
   * 添加任务
   */
  async addOrUpdate(param: CreateTaskDto | UpdateTaskDto) {
    const result = await this.getRepo().admin.sys.Task.save(param);
    if (result.status === 0) {
      await this.stop();
    } else if (result.status === 1) {
      await this.start(result);
    }
  }

  /**
   * 启动任务
   */
  async start(task: SysTask) {
    const exist = await this.existJob(String(task.id));
    if (exist) {
      return;
    }
    let options: any;
    if (task.type === 1) {
      // 间隔
      options = {
        repeat: {
          every: task.every,
          limit: task.limit,
        },
      };
    } else {
      // cron
      options = {
        repeat: {
          cron: task.cron,
          limit: task.limit,
        },
      };
    }
    const job = await this.app.queue.sys.add({ service: task.service, args: task.data }, { jobId: task.id, ...options });
    if (job.opts) {
      await this.getRepo().admin.sys.Task.update(task.id, { jobOpts: JSON.stringify(job.opts) });
    } else {
      throw new Error('Job Opts is null, Task init Error');
    }
  }

  /**
   * 查看队列中任务是否存在
   */
  async existJob(jobId: string) {
    const jobs = await this.app.queue.sys.getRepeatableJobs();
    const ids = jobs.map(e => {
      return e.id;
    });
    return ids.includes(jobId);
  }

  /**
   * 停止任务
   */
  async stop() {
    // await this.app.queue.sys.removeRepeatable();
  }

  /**
   * 根据serviceName调用service
   */
  callService(serviceName: string, args: string) {
    if (serviceName) {
      let serviceTmp = this.service;
      const arr = serviceName.split('.');
      this.ctx.logger.info(arr);
      for (let i = 0; i < arr.length; i++) {
        if (i === arr.length - 1) {
          if (args) {
            serviceTmp[arr[arr.length - 1]](JSON.parse(args));
          } else {
            serviceTmp[arr[arr.length - 1]]();
          }
        } else {
          serviceTmp = serviceTmp[arr[i]];
        }
      }
    }
  }

}
