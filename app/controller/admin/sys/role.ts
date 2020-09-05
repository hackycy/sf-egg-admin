import BaseController from '../../base';
import { AdminRoute } from '../../../decorator/router_register';

export default class SysRoleController extends BaseController {

  @AdminRoute('/sys/role/list', 'get')
  async list() {
    this.res({
      data: await this.service.admin.sys.role.list(),
    });
  }

}
