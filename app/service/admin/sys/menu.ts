import BaseService from '../../base';
import * as _ from 'lodash';
import { IsNull, Not } from 'typeorm';

/**
 * 系统-菜单
 */
export default class SysMenuService extends BaseService {

  /**
   * 根据角色获取所有菜单
   */
  async getMenus(uid: number) {
    const roleIds = await this.service.admin.sys.role.getRoleIdByUser(uid);
    let menus: any = null;
    if (_.includes(roleIds, this.config.rootRoleId)) {
      // root find all
      menus = await this.getRepo().admin.sys.Menu.find();
    } else {
      // [ 1, 2, 3 ] role find
      menus = await this.getRepo().admin.sys.Menu.createQueryBuilder('menu')
        .innerJoinAndSelect('sys_role_menu', 'role_menu', 'menu.id = role_menu.menu_id')
        .andWhere('role_menu.role_id IN (:...roldIds)', { roldIds: roleIds })
        .getMany();
    }
    return menus;
  }

  /**
   * 获取所有菜单
   */
  async list() {
    return await this.getRepo().admin.sys.Menu.find();
  }

  /**
   * 获取所有权限
   */
  async getPerms(uid: number) {
    const roleIds = await this.service.admin.sys.role.getRoleIdByUser(uid);
    let perms: string[] = [];
    let result: any = null;
    if (_.includes(roleIds, this.config.rootRoleId)) {
      // root find all perms
      result = await this.getRepo().admin.sys.Menu.find({ perms: Not(IsNull()), type: 2 });
    } else {
      result = await this.getRepo().admin.sys.Menu.createQueryBuilder('menu')
        .innerJoinAndSelect('sys_role_menu', 'role_menu', 'menu.id = role_menu.menu_id')
        .andWhere('role_menu.role_id IN (:...roldIds)', { roldIds: roleIds })
        .andWhere('menu.type = 2')
        .andWhere('menu.perms IS NOT NULL')
        .getMany();
    }
    if (!_.isEmpty(result)) {
      result.forEach(e => {
        perms = perms.concat(e.perms.split(','));
      });
      perms = _.uniq(perms);
    }
    return perms;
  }

}
