import * as Queue from 'bull';
import { Application } from 'egg';

/**
 * 自定义任务队列
 */
export default (app: Application) => {
  const ctx = app.createAnonymousContext();
  const tq = new Queue('sys-task', app.config.bull.default);

  // 处理任务
  tq.process(async function(job) {
    let id = -1;
    try {
      id = await ctx.service.admin.sys.taskLog.record(job.data.id, 0);
      await ctx.service.admin.sys.task.callService(job.data.service, job.data.args);
      await ctx.service.admin.sys.taskLog.updateTaskStatus(id, 1);
    } catch (e) {
      await ctx.service.admin.sys.taskLog.updateTaskStatus(id, 2, `${e.message}`);
    }
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  tq.on('completed', (job, _result) => {
    ctx.service.admin.sys.task.updateTaskCompleteStatus(job.data.id);
  });
  // tq.on('global:completed', (jobId, _result) => {
  //   ctx.service.admin.sys.task.updateTaskCompleteStatus(jobId);
  // });
  return tq;
};
