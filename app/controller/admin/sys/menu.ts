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

  @AdminRoute('/sys/menu/update', 'post')
  async update() {
    this.res({});
  }

  @AdminRoute('/sys/menu/info', 'get')
  async info() {
    const errors = this.app.validator.validate({
      menuId: 'int',
    }, this.getQuery());
    if (errors) {
      this.res({
        code: 10000,
      });
      return;
    }
    const { menuId } = this.getQuery();
    const data = await this.service.admin.sys.menu.getMenuItemInfo(menuId);
    this.res({
      data,
    });
  }

}
