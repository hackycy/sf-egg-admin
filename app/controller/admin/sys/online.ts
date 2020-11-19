import { AdminRoute } from '../../../decorator/router_register';
import { KickDto } from '../../../dto/admin/sys/online';
import BaseController from '../../base';

/**
 * 在线用户控制器
 */
export default class SysOnlineController extends BaseController {

  /**
   * @api {get} /admin/sys/online/list 获取在线用户列表
   * @apiGroup 在线用户
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiSuccess {Number} data.id 用户ID
   * @apiSuccess {String} data.ip 用户登陆IP
   * @apiSuccess {String} data.username 用户名
   * @apiSuccess {Boolean} data.isCurrent 是否为当前用户
   * @apiSuccess {String} data.time 登陆时间
   * @apiSuccess {Number} data.status 状态
   * @apiSuccess {String} data.os 登陆系统
   * @apiSuccess {String} data.browser 登陆浏览器
   * @apiSuccess {Boolean} data.disable 是否可用
   */
  @AdminRoute('/sys/online/list', 'get')
  async page() {
    this.res({
      data: await this.service.admin.sys.online.list(),
    });
  }

  /**
   * @api {get} /admin/sys/online/list 下线当前用户
   * @apiGroup 在线用户
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiParam {Number} id 当前用户ID
   */
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
    await this.service.admin.sys.user.forbidden(dto.id);
    this.res();
  }

}
