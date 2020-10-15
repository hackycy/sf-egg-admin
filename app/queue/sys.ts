import * as Queue from 'bull';
import { Application } from 'egg';

/**
 * 自定义任务队列
 */
export default (app: Application) => {
  app.logger.info('queue');
  const q = new Queue('sys-task', app.config.bull.default);
  q.process(function(job, done) {
    app.logger.info('[queue]', job.data);
    done();
  });
  return q;
};
