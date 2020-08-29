import BaseService from '../../base';
import * as _ from 'lodash';
import { IsNull, Not } from 'typeorm';

/**
 * 系统-菜单
 */
export default class SysMenuService extends BaseService {

  /**
   * 获取所有菜单
   */
  async list(roleIds: number[]) {
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
   * 获取所有权限
   */
  async perms(roleIds: number[]) {
    this.logger.info(roleIds);
    let perms: any = null;
    if (_.includes(roleIds, this.config.rootRoleId)) {
      // root find all perms
      perms = await this.getRepo().admin.sys.Menu.find({ type: 2, perms: Not(IsNull()) });
    } else {
      perms = await this.getRepo().admin.sys.Menu.createQueryBuilder('menu')
        .innerJoinAndSelect('sys_role_menu', 'role_menu', 'menu.id = role_menu.menu_id')
        .andWhere('role_menu.role_id IN (:...roldIds)', { roldIds: roleIds })
        .andWhere('menu.type = 2')
        .andWhere('menu.perms IS NOT NULL')
        .getMany();
    }
    return perms;
  }

}
