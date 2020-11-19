import { AdminRoute } from '../../../decorator/router_register';
import BaseController from '../../base';
import { PageGetDto } from '../../../dto/comm';

/**
 * 登录日志控制器
 */
export default class SysLoginLogController extends BaseController {

  /**
   * @api {get} /admin/sys/login-log/page 获取登录日志列表
   * @apiGroup 登录日志
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiUse Page
   * @apiSuccess {SysLoginLog[]} data.list 登录日志列表
   */
  @AdminRoute('/sys/login-log/page', 'get')
  async page() {
    const dto = await this.ctx.validate<PageGetDto>(PageGetDto, this.getQuery());
    this.res({
      data: {
        list: await this.service.admin.sys.loginLog.page(dto.page - 1, dto.limit),
        pagination: {
          page: dto.page,
          size: dto.limit,
          total: await this.service.admin.sys.loginLog.count(),
        },
      },
    });
  }

}
