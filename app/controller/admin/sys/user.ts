import BaseController from '../../base';
import { AdminRoute } from '../../../decorator/router_register';

export default class SysUserController extends BaseController {

  @AdminRoute('/sys/user/add', 'post')
  async add() {
    const errors = this.app.validator.validate({
      departmentId: 'int',
      name: 'string',
      username: 'string',
      roles: 'array',
    }, this.getBody());
    if (errors) {
      this.res({
        code: 10000,
      });
      return;
    }
    const result = await this.service.admin.sys.user.add(this.getBody());
    if (result) {
      this.res();
    } else {
      this.res({ code: 10001 });
    }
  }

  @AdminRoute('/sys/user/info', 'get')
  async info() {
    const errors = this.app.validator.validate({
      userId: 'string',
    }, this.getQuery());
    if (errors) {
      this.res({
        code: 10000,
      });
      return;
    }
    const user = await this.service.admin.sys.user.info(parseInt(this.getQuery().userId));
    this.res({
      data: user,
    });
  }

  @AdminRoute('/sys/user/delete', 'post')
  async delete() {
    const errors = this.app.validator.validate({
      userIds: 'array',
    }, this.getBody());
    if (errors) {
      this.res({
        code: 10000,
      });
      return;
    }
    const { userIds } = this.getBody();
    await this.service.admin.sys.user.delete(userIds);
    this.res();
  }

  @AdminRoute('/sys/user/page', 'get')
  async page() {
    const errors = this.app.validator.validate({
      departmentId: 'string',
    }, this.getQuery());
    if (errors) {
      this.res({
        code: 10000,
      });
      return;
    }
    const { page = 1, limit = 25, departmentId = -1 } = this.getQuery();
    if (page < 1 || limit <= 0) {
      this.res({
        code: 10000,
      });
      return;
    }
    this.res({
      data: {
        users: await this.service.admin.sys.user.page(parseInt(departmentId), page - 1, limit),
        userTotalCount: await this.service.admin.sys.user.count(parseInt(departmentId)),
      },
    });
  }

  @AdminRoute('/sys/user/update', 'post')
  async update() {
    const errors = this.app.validator.validate({
      departmentId: 'int',
      name: 'string',
      username: 'string',
      roles: 'array',
    }, this.getBody());
    if (errors) {
      this.res({
        code: 10000,
      });
      return;
    }
    await this.service.admin.sys.user.update(this.getBody());
    this.res();
  }

}
