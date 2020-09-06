import BaseController from '../../base';
import { AdminRoute } from '../../../decorator/router_register';

export default class SysRoleController extends BaseController {

  // @AdminRoute('/sys/role/list', 'get')
  // async list() {
  //   this.res({
  //     data: await this.service.admin.sys.role.list(),
  //   });
  // }

  @AdminRoute('/sys/role/page', 'get')
  async page() {
    const { page = 1, limit = 25 } = this.getQuery();
    if (page < 1) {
      this.res({
        code: 10000,
      });
      return;
    }
    this.res({
      data: {
        roles: await this.service.admin.sys.role.page(page - 1, limit),
        roleTotalCount: await this.service.admin.sys.role.count(),
      },
    });
  }

}
