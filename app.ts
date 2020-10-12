/**
 * Application
 */
export default app => {

  // const ctx = app.createAnonymousContext();

  app.beforeStart(() => {
    app.logger.info('beforeStart');
  });

  app.ready(() => {
    app.logger.info('=====service start succeed=====');
  });

  app.beforeClose(() => {
    app.logger.info('beforeClose');
  });

};
