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
        this.start(t);
      }
    }
  }

  /**
   * 添加任务
   */
  async addOrUpdate(param: CreateTaskDto | UpdateTaskDto) {
    const result = await this.getRepo().admin.sys.Task.save(param);
    if (result.status === 0) {
      await this.stop(result);
    } else if (result.status === 1) {
      await this.start(result);
    }
  }

  /**
   * 手动执行一次
   */
  async once(id: number) {
    const task = await this.getRepo().admin.sys.Task.findOne({ id });
    if (task) {
      await this.app.queue.sys.add({ id: task.id, service: task.service, args: task.data },
        { jobId: task.id, removeOnComplete: true, removeOnFail: true });
    }
  }

  /**
   * 启动任务
   */
  async start(task: SysTask) {
    if (!task) {
      return;
    }
    const exist = await this.existJob(String(task.id));
    if (exist) {
      // 已存在则先停止再启动
      await this.stop(task);
    }
    let repeat: any;
    if (task.type === 1) {
      // 间隔 Repeat every millis (cron setting cannot be used together with this setting.)
      repeat = {
        every: task.every,
      };
    } else {
      // cron
      repeat = {
        cron: task.cron,
      };
      // Start date when the repeat job should start repeating (only with cron).
      if (task.startTime) {
        repeat.startDate = task.startTime;
      }
      if (task.endTime) {
        repeat.endDate = task.endTime;
      }
    }
    if (task.limit > 0) {
      repeat.limit = task.limit;
    }
    const job = await this.app.queue.sys.add({ id: task.id, service: task.service, args: task.data },
      { jobId: task.id, removeOnComplete: true, removeOnFail: true, repeat });
    if (job.opts) {
      await this.getRepo().admin.sys.Task.update(task.id, { jobOpts: JSON.stringify(job.opts) });
    } else {
      // update status to 0，标识暂停任务，因为启动失败
      await this.getRepo().admin.sys.Task.update(task.id, { status: 0 });
    }
  }

  /**
   * 停止任务
   */
  async stop(task: SysTask) {
    if (task && task.jobOpts) {
      await this.app.queue.sys.removeRepeatable(JSON.parse(task.jobOpts));
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
   * 根据serviceName调用service
   */
  async callService(serviceName: string, args: string) {
    if (serviceName) {
      let serviceTmp = this.service;
      const arr = serviceName.split('.');
      this.ctx.logger.info(arr);
      for (let i = 0; i < arr.length; i++) {
        if (i === arr.length - 1) {
          if (args) {
            await serviceTmp[arr[arr.length - 1]](JSON.parse(args));
          } else {
            await serviceTmp[arr[arr.length - 1]]();
          }
        } else {
          serviceTmp = serviceTmp[arr[i]];
        }
      }
    }
  }

}
