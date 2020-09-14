import BaseController from '../../base';
import { AdminRoute } from '../../../decorator/router_register';

export default class SysRoleController extends BaseController {

  @AdminRoute('/sys/role/list', 'get')
  async list() {
    this.res({
      data: await this.service.admin.sys.role.list(),
    });
  }

  @AdminRoute('/sys/role/page', 'get')
  async page() {
    const { page = 1, limit = 25 } = this.getQuery();
    if (page < 1 || limit <= 0) {
      this.res({
        code: 10000,
      });
      return;
    }
    this.res({
      data: {
        roles: await this.service.admin.sys.role.page(page - 1, limit),
        roleTotalCount: await this.service.admin.sys.role.count(),
      },
    });
  }

  @AdminRoute('/sys/role/delete', 'post')
  async delete() {
    const errors = this.app.validator.validate({
      roleIds: 'array',
    }, this.getBody());
    if (errors) {
      this.res({
        code: 10000,
      });
      return;
    }
    const { roleIds } = this.getBody();
    const count = await this.service.admin.sys.role.countUserIdByRole(roleIds);
    if (count > 0) {
      this.res({
        code: 10008,
      });
      return;
    }
    await this.service.admin.sys.role.delete(roleIds);
    this.res();
  }

  @AdminRoute('/sys/role/add', 'post')
  async add() {
    const errors = this.app.validator.validate({
      name: 'string',
      label: 'string',
    }, this.getBody());
    if (errors) {
      this.res({
        code: 10000,
      });
      return;
    }
    this.res({
      data: await this.service.admin.sys.role.add(this.getBody(), this.ctx.token.uid),
    });
  }

  @AdminRoute('/sys/role/update', 'post')
  async update() {
    const errors = this.app.validator.validate({
      roleId: 'int',
      name: 'string',
      label: 'string',
    }, this.getBody());
    if (errors) {
      this.res({
        code: 10000,
      });
      return;
    }
    await this.service.admin.sys.role.update(this.getBody());
    this.res();
  }

  @AdminRoute('/sys/role/info', 'get')
  async info() {
    const errors = this.app.validator.validate({
      roleId: 'string',
    }, this.getQuery());
    if (errors) {
      this.res({
        code: 10000,
      });
      return;
    }
    const { roleId } = this.getQuery();
    this.res({
      data: await this.service.admin.sys.role.info(parseInt(roleId)),
    });
  }

}
