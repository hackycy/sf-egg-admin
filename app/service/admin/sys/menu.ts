import BaseService from '../../base';
// import * as _ from 'lodash';

/**
 * 系统-菜单
 */
export default class SysMenuService extends BaseService {

  /**
   * 获取所有菜单
   */
  async list() {
    // const roleIds = await this.service.admin.sys.role.getByUser(1);
    let menus: any = null;
    menus = await this.getRepo().admin.sys.Menu.find();
    return menus;
  }

}
