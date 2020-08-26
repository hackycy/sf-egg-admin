import BaseController from './base';
import { Route } from '../decorator/router_register';

export default class WelcomeController extends BaseController {

  @Route('/', 'all')
  async index() {
    this.res({
      message: '/',
    });
  }

  @Route('/test', 'all')
  async test() {
    this.res({
      data: this.getHelper().md5('Message'),
    });
  }

}
