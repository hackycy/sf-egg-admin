import { AdminRoute } from '../../../decorator/router_register';
import BaseController from '../../base';

/**
 * 系统日志控制器
 */
export default class SysLogController extends BaseController {

  @AdminRoute('/sys/log/page', 'get')
  async page() {
    const { page = 1, limit = 50 } = this.getQuery();
    if (page < 1 || limit <= 0) {
      this.res({
        code: 10000,
      });
      return;
    }
    this.res({
      data: {
        logs: await this.service.admin.sys.log.page(page - 1, limit),
        count: await this.service.admin.sys.log.count(),
      },
    });
  }

  @AdminRoute('/sys/log/search', 'get')
  async search() {
    const errors = this.app.validator.validate({
      q: 'string',
    }, this.getQuery());
    if (errors) {
      this.res({
        code: 10000,
      });
      return;
    }
    const { page = 1, limit = 50, q } = this.getQuery();
    this.res({
      data: await this.service.admin.sys.log.search(page - 1, limit, q),
    });
  }

}
