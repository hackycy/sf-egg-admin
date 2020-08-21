import BaseController from './base';

export default class WelcomeController extends BaseController {
  async index() {
    this.res({
      message: 'welcome for siyee server',
    });
  }
}
