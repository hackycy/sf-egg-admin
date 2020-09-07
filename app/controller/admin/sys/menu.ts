import BaseController from '../../base';
import { AdminRoute } from '../../../decorator/router_register';
import * as _ from 'lodash';

export default class SysMenuController extends BaseController {

  @AdminRoute('/sys/menu/list', 'get')
  async list() {
    this.res(
      {
        data: await this.service.admin.sys.menu.getMenus(this.ctx.token.uid),
      },
    );
  }

  @AdminRoute('/sys/menu/add', 'post')
  async add() {
    const { type } = this.getBody();
    if (_.isEmpty(`${type}`) && !_.includes(type, [ 0, 1, 2 ])) {
      this.res({
        code: 10000,
      });
      return;
    }
    const catalogRules = {
      parentId: 'int',
      name: 'string',
      router: 'string',
    };
    const menuRules = {
      parentId: 'int',
      name: 'string',
      router: 'string',
      viewPath: 'string',
    };
    const permRules = {
      parentId: 'int',
      name: 'string',
      perms: 'string',
    };
    let rules: any;
    if (type === 0) { // 目录
      rules = catalogRules;
    } else if (type === 1) { // 菜单
      rules = menuRules;
    } else if (type === 2) { // 权限
      rules = permRules;
    }
    const errors = this.app.validator.validate(rules, this.getBody());
    this.ctx.logger.error(errors);
    if (errors) {
      this.res({
        code: 10000,
      });
      return;
    }
    const menu = { ...this.getBody() };
    if (type === 2 && menu.parentId === -1) {
      // 无法直接创建权限，必须有ParentId
      this.res({ code: 10005 });
      return;
    }
    const originMenu = await this.service.admin.sys.menu.getMenuItemInfo(menu.id);
    if (originMenu && (originMenu.type !== menu.type)) {
      // 节点类型发生变化则直接返回
      this.res({
        code: 10007,
      });
      return;
    }
    if (type === 1 && menu.parentId !== -1) {
      const parent = await this.service.admin.sys.menu.getMenuItemInfo(menu.parentId);
      if (!parent) {
        throw new Error('父节点菜单不存在！');
      }
      if (parent && parent.type === 1) {
        // 当前新增为菜单但父节点也为菜单时为非法操作
        this.res({
          code: 10006,
        });
        return;
      }
    }
    if (menu.parentId === -1) {
      menu.parentId = null;
    }
    // const { router } = menu;
    // if (router) {
    //   const exists = await this.service.admin.sys.menu.findRouterExist(router);
    //   if (exists) {
    //     this.res({ code: 10004 });
    //     return;
    //   }
    // }
    const saveData = await this.service.admin.sys.menu.save(menu);
    if (type === 2) {
      // 如果是权限发生更改，则刷新当前用户权限
      await this.service.admin.sys.menu.refreshPerms(this.ctx.token.uid);
    }
    this.res({
      data: saveData,
    });
  }

  @AdminRoute('/sys/menu/update', 'post')
  async update() {
    await this.add();
  }

  @AdminRoute('/sys/menu/delete', 'post')
  async delete() {
    const errors = this.app.validator.validate({
      menuId: 'int',
    }, this.getBody());
    if (errors) {
      this.res({
        code: 10000,
      });
      return;
    }
    const { menuId } = this.getBody();
    // 如果有子目录，一并删除
    const childMenus = await this.service.admin.sys.menu.findChildMenus(menuId);
    await this.service.admin.sys.menu.deleteMenuItem(_.concat([ menuId ], childMenus));
    await this.service.admin.sys.menu.refreshPerms(this.ctx.token.uid);
    this.res();
  }

  @AdminRoute('/sys/menu/info', 'get')
  async info() {
    const errors = this.app.validator.validate({
      menuId: 'string',
    }, this.getQuery());
    if (errors) {
      this.res({
        code: 10000,
      });
      return;
    }
    const { menuId } = this.getQuery();
    const data = await this.service.admin.sys.menu.getMenuItemAndParentInfo(parseInt(menuId));
    this.res({
      data,
    });
  }

}
