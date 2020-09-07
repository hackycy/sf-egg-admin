import BaseController from './base';
import { Route } from '../decorator/router_register';
// import * as _ from 'lodash';

export default class WelcomeController extends BaseController {

  @Route('/', 'all')
  async index() {
    this.res({
      message: '/',
    });
  }

  // @Route('/test', 'all')
  // async test() {
  //   this.res({
  //     data: _.difference([ 3, 2, 1 ], [ 3 ]),
  //   });
  // }

}
