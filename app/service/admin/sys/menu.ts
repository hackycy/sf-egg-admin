import BaseService from '../../base';
import * as _ from 'lodash';

/**
 * 系统-菜单
 */
export default class SysMenuService extends BaseService {

  /**
   * 获取所有菜单
   */
  async list() {
    const role = [ 2 ];
    let menus: any = null;
    if (_.includes(role, this.config.rootRoleId)) {
      // root find all
      menus = await this.getRepo().admin.sys.Menu.find();
    } else {
      // [ 1, 2, 3 ] role find
      menus = await this.getRepo().admin.sys.Menu.createQueryBuilder('menu')
        .innerJoinAndSelect('sys_role_menu', 'role_menu', 'menu.id = role_menu.menu_id').getMany();
    }
    return menus;
  }

}
