import BaseController from '../../base';
import { AdminRoute } from '../../../decorator/router_register';
import { CreateUserDto, InfoUserDto, DeleteUserDto, QueryUserDto, UpdateUserDto } from '../../../dto/admin/sys/user';

export default class SysUserController extends BaseController {

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

  @AdminRoute('/sys/user/info', 'get')
  async info() {
    const dto = await this.ctx.validate<InfoUserDto>(InfoUserDto, this.getQuery());
    const user = await this.service.admin.sys.user.info(parseInt(dto.userId));
    this.res({
      data: user,
    });
  }

  @AdminRoute('/sys/user/delete', 'post')
  async delete() {
    const dto = await this.ctx.validate<DeleteUserDto>(DeleteUserDto);
    await this.service.admin.sys.user.delete(dto.userIds);
    this.res();
  }

  @AdminRoute('/sys/user/page', 'get')
  async page() {
    const dto = await this.ctx.validate<QueryUserDto>(QueryUserDto, this.getQuery());
    this.res({
      data: {
        users: await this.service.admin.sys.user.page(parseInt(dto.departmentId), parseInt(dto.page) - 1, parseInt(dto.limit)),
        userTotalCount: await this.service.admin.sys.user.count(parseInt(dto.departmentId)),
      },
    });
  }

  @AdminRoute('/sys/user/update', 'post')
  async update() {
    const dto = await this.ctx.validate<UpdateUserDto>(UpdateUserDto);
    await this.service.admin.sys.user.update(dto);
    await this.service.admin.sys.menu.refreshPerms(this.ctx.token.uid);
    this.res();
  }

}
