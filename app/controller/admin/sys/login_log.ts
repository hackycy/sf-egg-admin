import { AdminRoute } from '../../../decorator/router_register';
import BaseController from '../../base';
import { PageGetDto } from '../../../dto/comm';

/**
 * 登录日志控制器
 */
export default class SysLoginLogController extends BaseController {

  @AdminRoute('/sys/login/page', 'get')
  async page() {
    const dto = await this.ctx.validate<PageGetDto>(PageGetDto, this.getQuery());
    this.res({
      data: {
        list: await this.service.admin.sys.loginLog.page(dto.page - 1, dto.limit),
        pagination: {
          page: dto.page,
          size: dto.limit,
          total: await this.service.admin.sys.reqLog.count(),
        },
      },
    });
  }

}
