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

}
