import BaseController from '../../base';
import { AdminRoute } from '../../../decorator/router_register';
import { CreateUserDto, InfoUserDto, DeleteUserDto, QueryUserDto, UpdateUserDto } from '../../../dto/admin/sys/user';

export default class SysUserController extends BaseController {

  /**
   * @api {post} /admin/sys/user/add 新增系统用户
   * @apiGroup 系统用户
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiUse Page
   * @apiParam {Number} departmentId 部门编号
   * @apiParam {String} name 管理员名称
   * @apiParam {String} username 用户名
   * @apiParam {String} nickName 别名
   * @apiParam {Number[]} roles 关联角色编号列表，最多三个
   * @apiParam {String} remark 用户备注
   * @apiParam {String} email 邮箱
   * @apiParam {String} phone 手机
   * @apiParam {Number} status 状态
   */
  @AdminRoute('/sys/user/add', 'post')
  async add() {
    const dto = await this.ctx.validate<CreateUserDto>(CreateUserDto);
    const result = await this.service.admin.sys.user.add(dto);
    if (result) {
      this.res();
    } else {
      this.res({ code: 10001 });
    }
  }

  /**
   * @api {post} /admin/sys/user/info 获取系统用户信息
   * @apiGroup 系统用户
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiUse Page
   * @apiParam {Number} id 用户编号
   * @apiSuccess {SysUser} data 用户列表
   */
  @AdminRoute('/sys/user/info', 'get')
  async info() {
    const dto = await this.ctx.validate<InfoUserDto>(InfoUserDto, this.getQuery());
    const user = await this.service.admin.sys.user.info(parseInt(dto.userId));
    this.res({
      data: user,
    });
  }

  /**
   * @api {post} /admin/sys/user/delete 删除用户列表
   * @apiGroup 系统用户
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiUse Page
   * @apiParam {Number[]} userIds 用户编号列表
   * @apiSuccess {SysUser} data 用户列表
   */
  @AdminRoute('/sys/user/delete', 'post')
  async delete() {
    const dto = await this.ctx.validate<DeleteUserDto>(DeleteUserDto);
    await this.service.admin.sys.user.delete(dto.userIds);
    await this.service.admin.sys.user.multiForbidden(dto.userIds);
    this.res();
  }

  /**
   * @api {get} /admin/sys/user/page 获取系统用户列表
   * @apiGroup 系统用户
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiUse Page
   * @apiParam {Number} departmentId 部门编号
   * @apiSuccess {SysUser[]} data.list 用户列表
   */
  @AdminRoute('/sys/user/page', 'get')
  async page() {
    const dto = await this.ctx.validate<QueryUserDto>(QueryUserDto, this.getQuery());
    this.res({
      data: {
        list: await this.service.admin.sys.user.page(this.ctx.token.uid, parseInt(dto.departmentId), dto.page - 1, dto.limit),
        pagination: {
          total: await this.service.admin.sys.user.count(this.ctx.token.uid, parseInt(dto.departmentId)),
          page: dto.page,
          size: dto.limit,
        },
      },
    });
  }

  /**
   * @api {post} /admin/sys/user/update 更新系统用户信息
   * @apiGroup 系统用户
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiUse Page
   * @apiParam {Number} departmentId 部门编号
   * @apiParam {String} name 管理员名称
   * @apiParam {String} username 用户名
   * @apiParam {String} nickName 别名
   * @apiParam {Number[]} roles 关联角色编号列表，最多三个
   * @apiParam {String} remark 用户备注
   * @apiParam {String} email 邮箱
   * @apiParam {String} phone 手机
   * @apiParam {Number} status 状态
   * @apiParam {Number} id 用户编号
   */
  @AdminRoute('/sys/user/update', 'post')
  async update() {
    const dto = await this.ctx.validate<UpdateUserDto>(UpdateUserDto);
    await this.service.admin.sys.user.update(dto);
    await this.service.admin.sys.menu.refreshPerms(dto.id);
    this.res();
  }

}
