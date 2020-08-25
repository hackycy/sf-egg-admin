import BaseController from './base';
import { Route } from '../decorator/router_register';

export default class WelcomeController extends BaseController {

  @Route('/', 'all')
  async index() {
    this.res({
      message: 'welcome',
    });
  }

}
