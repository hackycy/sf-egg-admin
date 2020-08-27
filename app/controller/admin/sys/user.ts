import BaseController from '../../base';
import { AdminRoute } from '../../../decorator/router_register';

export default class SysUserController extends BaseController {

  @AdminRoute('/sys/user/add', 'post')
  async add() {
    const errors = this.app.validator.validate({
      departmentId: 'int',
      name: 'string',
      username: 'string',
    }, this.getBody());
    if (errors) {
      this.res({
        code: 10000,
      });
      return;
    }
    const success = await this.service.sys.user.add(this.getBody());
    if (success) {
      this.res();
    } else {
      this.res({
        code: 10001,
      });
    }
  }

  @AdminRoute('/sys/user/info', 'post')
  async info() {
    const errors = this.app.validator.validate({
      id: 'int',
    }, this.getBody());
    if (errors) {
      this.res({
        code: 10000,
      });
      return;
    }
    const user = await this.service.sys.user.info(this.getBody().id);
    this.res({
      data: user,
    });
  }

}
