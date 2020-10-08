import { Application } from 'egg';
import { initRouter } from './decorator/router_register';

export default (app: Application) => {
  const { controller, router } = app;
  // router.all('/a', controller.welcome.index);
  // 使用@Route进行注册路由
  initRouter(app);
  // share server router
  router.get('/', controller.app.home.index);
  router.get('/login', controller.app.home.login);
};
