import BaseController from '../base';

/**
 * 首页控制器
 */
export default class HomeController extends BaseController {

  async index() {
    await this.ctx.render('home.nj');
  }

}
