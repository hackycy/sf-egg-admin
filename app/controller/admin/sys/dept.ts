import BaseController from '../../base';
import { AdminRoute } from '../../../decorator/router_register';

/**
 * 系统部门控制器
 */
export default class SysDeptController extends BaseController {

  @AdminRoute('/sys/dept/list', 'get')
  async list() {
    this.res(
      {
        data: await this.service.admin.sys.dept.getDepts(this.ctx.token.uid),
      },
    );
  }

  @AdminRoute('/sys/dept/delete', 'post')
  async delete() {
    const errors = this.app.validator.validate({
      departmentId: 'int',
    }, this.getBody());
    if (errors) {
      this.res({
        code: 10000,
      });
      return;
    }
    const { departmentId } = this.getBody();
    await this.service.admin.sys.dept.delete(departmentId);
    this.res();
  }

  @AdminRoute('/sys/dept/transfer', 'post')
  async transfer() {
    const errors = this.app.validator.validate({
      userIds: 'array',
      departmentId: 'int',
    }, this.getBody());
    if (errors) {
      this.res({
        code: 10000,
      });
      return;
    }
    const { userIds, departmentId } = this.getBody();
    await this.service.admin.sys.dept.transfer(userIds, departmentId);
    this.res();
  }
}
