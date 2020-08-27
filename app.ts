/**
 * Application
 */
export default app => {

  const ctx = app.createAnonymousContext();

  app.beforeStart(() => {
    ctx.logger.info('beforeStart');
  });

  app.ready(() => {
    ctx.logger.info('=====service start succeed=====');
  });

  app.beforeClose(() => {
    ctx.logger.info('beforeClose');
  });

};
