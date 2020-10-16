import * as Queue from 'bull';
import { Application } from 'egg';

/**
 * 自定义任务队列
 */
export default (app: Application) => {
  const ctx = app.createAnonymousContext();
  const tq = new Queue('sys-task', app.config.bull.default);

  // 处理任务
  tq.process(function(job, done) {
    try {
      ctx.service.admin.sys.task.callService(job.data.service, job.data.args);
    } catch (e) {
      throw e;
    }
    done();
  });
  return tq;
};
