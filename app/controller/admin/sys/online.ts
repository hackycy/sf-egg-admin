import { AdminRoute } from '../../../decorator/router_register';
import { KickDto } from '../../../dto/admin/sys/online';
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

  @AdminRoute('/sys/online/kick', 'post')
  async kick() {
    const dto = await this.ctx.validate<KickDto>(KickDto);
    if (dto.id === this.ctx.token.uid) {
      this.res({
        code: 10012,
      });
      return;
    }
    if (dto.id === this.config.rootRoleId) {
      this.res({
        code: 10013,
      });
      return;
    }
    this.res({
      data: await this.service.admin.sys.user.forbidden(dto.id),
    });
  }

}
