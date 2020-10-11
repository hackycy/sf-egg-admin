import BaseController from '../../base';
import { AdminRoute } from '../../../decorator/router_register';
import { PageGetDto } from '../../../dto/comm';
import { DeleteRoleDto, CreateRoleDto, UpdateRoleDto, InfoRoleDto } from '../../../dto/admin/sys/role';

export default class SysRoleController extends BaseController {

  @AdminRoute('/sys/role/list', 'get')
  async list() {
    this.res({
      data: await this.service.admin.sys.role.list(),
    });
  }

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
    this.res();
  }

  @AdminRoute('/sys/role/add', 'post')
  async add() {
    const dto = await this.ctx.validate<CreateRoleDto>(CreateRoleDto);
    this.res({
      data: await this.service.admin.sys.role.add(dto, this.ctx.token.uid),
    });
  }

  @AdminRoute('/sys/role/update', 'post')
  async update() {
    const dto = await this.ctx.validate<UpdateRoleDto>(UpdateRoleDto);
    await this.service.admin.sys.role.update(dto);
    this.res();
  }

  @AdminRoute('/sys/role/info', 'get')
  async info() {
    const dto = await this.ctx.validate<InfoRoleDto>(InfoRoleDto, this.getQuery());
    this.res({
      data: await this.service.admin.sys.role.info(parseInt(dto.roleId)),
    });
  }

}
