import BaseController from '../base';
import { AdminRoute } from '../../decorator/router_register';

export default class SysUserController extends BaseController {

  @AdminRoute('/sys/user/add', 'post')
  async add() {
    const success = await this.getService().sys.user.add(this.getBody());
    if (success) {
      this.res();
    } else {
      this.res({
        code: 10001,
        message: this.ctx.helper.getErrorMessageByCode('10001'),
      });
    }
  }

  @AdminRoute('/sys/user/info', 'get')
  async info() {
    const user = await this.getService().sys.user.info(this.ctx.query.id);
    this.res({
      data: user,
    });
  }

}
