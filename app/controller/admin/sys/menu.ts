import BaseController from '../../base';
import { AdminRoute } from '../../../decorator/router_register';

export default class SysMenuController extends BaseController {

  @AdminRoute('/sys/menu/list', 'get')
  async list() {
    this.res(
      {
        data: await this.service.admin.sys.menu.list(),
      },
    );
  }

}
