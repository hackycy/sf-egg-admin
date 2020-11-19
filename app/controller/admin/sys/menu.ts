import BaseController from '../../base';
import { AdminRoute } from '../../../decorator/router_register';
import * as _ from 'lodash';
import { CreateMenuDto, InfoMenuDto, DeleteMenuDto, UpdateMenuDto } from '../../../dto/admin/sys/menu';

export default class SysMenuController extends BaseController {

  /**
   * @api {get} /admin/sys/menu/list 获取所有菜单
   * @apiGroup 系统菜单
   * @apiUse Auth
   * @apiUse BaseRes
   */
  @AdminRoute('/sys/menu/list', 'get')
  async list() {
    this.res(
      {
        data: await this.service.admin.sys.menu.getMenus(this.ctx.token.uid),
      },
    );
  }

  /**
   * @api {post} /admin/sys/menu/add 增加菜单
   * @apiGroup 系统菜单
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiParam {Number} type 菜单类别
   * @apiParam {Number} parentId 父级菜单，无则为-1
   * @apiParam {String} name 菜单名称
   * @apiParam {Number} orderNum 排序
   * @apiParam {String} router 路由地址
   * @apiParam {Boolean} isShow 是否显示
   * @apiParam {Boolean} keepalive 开启keepalive
   * @apiParam {String} icon 对应svg图标文件名称
   * @apiParam {String} perms 权限
   * @apiParam {String} viewPath vue文件路径
   */
  @AdminRoute('/sys/menu/add', 'post')
  async add() {
    const dto = await this.ctx.validate<CreateMenuDto>(CreateMenuDto);
    if (dto.type === 2 && dto.parentId === -1) {
      // 无法直接创建权限，必须有ParentId
      this.res({ code: 10005 });
      return;
    }
    if (dto.type === 1 && dto.parentId !== -1) {
      const parent = await this.service.admin.sys.menu.getMenuItemInfo(dto.parentId);
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
    const insertData: any = { ...dto };
    if (dto.parentId === -1) {
      insertData.parentId = null;
    }
    const saveData = await this.service.admin.sys.menu.save(insertData);
    if (dto.type === 2) {
      // 如果是权限发生更改，则刷新所有在线用户的权限
      await this.service.admin.sys.menu.refreshOnlineUserPerms();
    }
    this.res({
      data: saveData,
    });
  }

  /**
   * @api {post} /admin/sys/menu/update 更新菜单
   * @apiGroup 系统菜单
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiParam {Number} type 菜单类别
   * @apiParam {Number} parentId 父级菜单，无则为-1
   * @apiParam {String} name 菜单名称
   * @apiParam {Number} orderNum 排序
   * @apiParam {String} router 路由地址
   * @apiParam {Boolean} isShow 是否显示
   * @apiParam {Boolean} keepalive 开启keepalive
   * @apiParam {String} icon 对应svg图标文件名称
   * @apiParam {String} perms 权限
   * @apiParam {String} viewPath vue文件路径
   * @apiParam {Number} menuId 菜单编号
   */
  @AdminRoute('/sys/menu/update', 'post')
  async update() {
    const dto = await this.ctx.validate<UpdateMenuDto>(UpdateMenuDto);
    if (dto.type === 2 && dto.parentId === -1) {
      // 无法直接创建权限，必须有ParentId
      this.res({ code: 10005 });
      return;
    }
    const originMenu = await this.service.admin.sys.menu.getMenuItemInfo(dto.menuId);
    if (originMenu && (originMenu.type !== dto.type)) {
      // 节点类型发生变化则直接返回
      this.res({
        code: 10007,
      });
      return;
    }
    if (dto.type === 1 && dto.parentId !== -1) {
      const parent = await this.service.admin.sys.menu.getMenuItemInfo(dto.parentId);
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
    const updateData: any = { ...dto };
    if (dto.parentId === -1) {
      updateData.parentId = null;
    }
    // update id
    updateData.id = dto.menuId;
    const saveData = await this.service.admin.sys.menu.save(updateData);
    // 如果是权限发生更改，则刷新所有在线用户权限
    await this.service.admin.sys.menu.refreshOnlineUserPerms();
    this.res({
      data: saveData,
    });
  }

  /**
   * @api {post} /admin/sys/menu/delete 删除菜单
   * @apiGroup 系统菜单
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiParam {Number} menuId 菜单编号
   */
  @AdminRoute('/sys/menu/delete', 'post')
  async delete() {
    const dto = await this.ctx.validate<DeleteMenuDto>(DeleteMenuDto);
    // 如果有子目录，一并删除
    const childMenus = await this.service.admin.sys.menu.findChildMenus(dto.menuId);
    await this.service.admin.sys.menu.deleteMenuItem(_.flattenDeep([ dto.menuId, childMenus ]));
    await this.service.admin.sys.menu.refreshOnlineUserPerms();
    this.res();
  }

  /**
   * @api {get} /admin/sys/menu/info 获取菜单信息
   * @apiGroup 系统菜单
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiParam {String} menuId 菜单编号
   */
  @AdminRoute('/sys/menu/info', 'get')
  async info() {
    const dto = await this.ctx.validate<InfoMenuDto>(InfoMenuDto, this.getQuery());
    const data = await this.service.admin.sys.menu.getMenuItemAndParentInfo(parseInt(dto.menuId));
    this.res({
      data,
    });
  }

}
