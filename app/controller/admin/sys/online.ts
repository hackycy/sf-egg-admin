import { AdminRoute } from '../../../decorator/router_register';
import BaseController from '../../base';

/**
 * 在线用户控制器
 */
export default class SysOnlineController extends BaseController {

  @AdminRoute('/sys/online/list', 'get')
  async page() {
    this.res({
      data: await this.service.admin.sys.online.list(),
    });
  }

}
