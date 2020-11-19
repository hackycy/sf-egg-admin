import BaseController from '../../base';
import { AdminRoute } from '../../../decorator/router_register';
import { PageGetDto } from '../../../dto/comm';
import { DeleteRoleDto, CreateRoleDto, UpdateRoleDto, InfoRoleDto } from '../../../dto/admin/sys/role';

export default class SysRoleController extends BaseController {

  /**
   * @api {get} /admin/sys/role/list 获取全部系统角色列表
   * @apiGroup 系统角色
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiSuccess {SysRole[]} data 角色列表
   */
  @AdminRoute('/sys/role/list', 'get')
  async list() {
    this.res({
      data: await this.service.admin.sys.role.list(),
    });
  }

  /**
   * @api {get} /admin/sys/role/page 获取系统角色列表
   * @apiGroup 系统角色
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiUse Page
   * @apiSuccess {SysRole[]} data.list 角色列表
   */
  @AdminRoute('/sys/role/page', 'get')
  async page() {
    const dto = await this.ctx.validate<PageGetDto>(PageGetDto, this.getQuery());
    this.res({
      data: {
        list: await this.service.admin.sys.role.page(dto.page - 1, dto.limit),
        pagination: {
          page: dto.page,
          size: dto.limit,
          total: await this.service.admin.sys.role.count(),
        },
      },
    });
  }

  /**
   * @api {post} /admin/sys/role/delete 删除角色
   * @apiGroup 系统角色
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiParam {Number[]} roleIds 角色编号列表
   */
  @AdminRoute('/sys/role/delete', 'post')
  async delete() {
    const dto = await this.ctx.validate<DeleteRoleDto>(DeleteRoleDto);
    const count = await this.service.admin.sys.role.countUserIdByRole(dto.roleIds);
    if (count > 0) {
      this.res({
        code: 10008,
      });
      return;
    }
    await this.service.admin.sys.role.delete(dto.roleIds);
    await this.service.admin.sys.menu.refreshOnlineUserPerms();
    this.res();
  }

  /**
   * @api {post} /admin/sys/role/add 新增角色
   * @apiGroup 系统角色
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiParam {String} name 角色名称
   * @apiParam {String} label 角色表示
   * @apiParam {String} remark 备注
   * @apiParam {Number[]} menus 关联菜单ID列表
   * @apiParam {Number[]} depts 关联部门ID列表
   */
  @AdminRoute('/sys/role/add', 'post')
  async add() {
    const dto = await this.ctx.validate<CreateRoleDto>(CreateRoleDto);
    this.res({
      data: await this.service.admin.sys.role.add(dto, this.ctx.token.uid),
    });
  }

  /**
   * @api {post} /admin/sys/role/update 更新角色
   * @apiGroup 系统角色
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiParam {String} name 角色名称
   * @apiParam {String} label 角色表示
   * @apiParam {String} remark 备注
   * @apiParam {Number[]} menus 关联菜单ID列表
   * @apiParam {Number[]} depts 关联部门ID列表
   * @apiParam {Number} roleId 角色编号
   */
  @AdminRoute('/sys/role/update', 'post')
  async update() {
    const dto = await this.ctx.validate<UpdateRoleDto>(UpdateRoleDto);
    await this.service.admin.sys.role.update(dto);
    await this.service.admin.sys.menu.refreshOnlineUserPerms();
    this.res();
  }

  /**
   * @api {get} /admin/sys/role/list 获取全部系统角色列表
   * @apiGroup 系统角色
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiSuccess {SysRole} data 角色信息
   */
  @AdminRoute('/sys/role/info', 'get')
  async info() {
    const dto = await this.ctx.validate<InfoRoleDto>(InfoRoleDto, this.getQuery());
    this.res({
      data: await this.service.admin.sys.role.info(parseInt(dto.roleId)),
    });
  }

}
