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
  async list() {
    return await this.getRepo().admin.sys.Menu.find();
  }

  /**
   * 保存或新增菜单
   */
  async save(menu: any) {
    const result = await this.getRepo().admin.sys.Menu.save(menu);
    return result;
  }

  /**
   * 根据角色获取所有菜单
   */
  async getMenus(uid: number) {
    const roleIds = await this.service.admin.sys.role.getRoleIdByUser(uid);
    let menus: any = [];
    if (_.includes(roleIds, this.config.rootRoleId)) {
      // root find all
      menus = await this.getRepo().admin.sys.Menu.find();
    } else {
      // [ 1, 2, 3 ] role find
      menus = await this.getRepo().admin.sys.Menu.createQueryBuilder('menu')
        .innerJoinAndSelect('sys_role_menu', 'role_menu', 'menu.id = role_menu.menu_id')
        .andWhere('role_menu.role_id IN (:...roldIds)', { roldIds: roleIds })
        .orderBy('menu.order_num', 'DESC')
        .getMany();
    }
    return menus;
  }

  /**
   * 查找当前菜单下的子菜单，目录以及菜单
   */
  async findChildMenus(mid: number) {
    const allMenus: any = [];
    const menus = await this.getRepo().admin.sys.Menu.find({ parentId: mid });
    // if (_.isEmpty(menus)) {
    //   return allMenus;
    // }
    // const childMenus: any = [];
    for (let i = 0; i < menus.length; i++) {
      if (menus[i].type !== 2) {
        // 子目录下是菜单或目录，继续往下级查找
        const c = await this.findChildMenus(menus[i].id);
        allMenus.push(c);
      }
      allMenus.push(menus[i].id);
    }
    return allMenus;
  }

  /**
   * 获取某个菜单的信息
   * @param mid menu id
   */
  async getMenuItemInfo(mid: number) {
    const menu = await this.getRepo().admin.sys.Menu.findOne({ id: mid });
    return menu;
  }

  /**
   * 获取某个菜单以及关联的父菜单的信息
   */
  async getMenuItemAndParentInfo(mid: number) {
    const menu = await this.getRepo().admin.sys.Menu.findOne({ id: mid });
    let parentMenu: any = null;
    if (menu && menu.parentId) {
      parentMenu = await this.getRepo().admin.sys.Menu.findOne({ id: menu.parentId });
    }
    return { menu, parentMenu };
  }

  /**
   * 查找节点路由是否存在
   */
  async findRouterExist(router: string) {
    const menus = await this.getRepo().admin.sys.Menu.findOne({ router });
    return !_.isEmpty(menus);
  }

  /**
   * 获取当前用户的所有权限
   */
  async getPerms(uid: number) {
    const roleIds = await this.service.admin.sys.role.getRoleIdByUser(uid);
    let perms: any[] = [];
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
        perms = _.concat(perms, e.perms.split(','));
      });
      perms = _.uniq(perms);
    }
    return perms;
  }

  /**
   * 删除多项菜单
   */
  async deleteMenuItem(mids: number[]) {
    return await this.getRepo().admin.sys.Menu.delete(mids);
  }

  /**
   * 刷新指定用户ID的权限
   */
  async refreshPerms(uid: number) {
    const perms = await this.getPerms(uid);
    const online = await this.getAdminRedis().get(`admin:token:${uid}`);
    if (online) {
      // 判断是否在线
      await this.getAdminRedis().set(`admin:perms:${uid}`, JSON.stringify(perms));
    }
  }

  /**
   * 刷新所有在线用户的权限
   */
  async refreshOnlineUserPerms() {
    const onlineUserIds: string[] = await this.getAdminRedis().keys('admin:token:*');
    if (onlineUserIds && onlineUserIds.length > 0) {
      for (let i = 0; i < onlineUserIds.length; i++) {
        const uid = onlineUserIds[i].split('admin:token:')[1];
        const perms = await this.getPerms(parseInt(uid));
        await this.getAdminRedis().set(`admin:perms:${uid}`, JSON.stringify(perms));
      }
    }
  }

}
