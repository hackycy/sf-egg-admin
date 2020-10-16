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
    try {
      await ctx.service.admin.sys.task.callService(job.data.service, job.data.args);
      try {
        await ctx.service.admin.sys.taskLog.record(job.data.id, 1);
      } catch (e) {
        // 防止数据库出错导致的失败记录
        app.logger.error(e);
      }
    } catch (e) {
      await ctx.service.admin.sys.taskLog.record(job.data.id, 0, `${e}`);
    }
  });
  return tq;
};
