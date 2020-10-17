import { AdminRoute } from '../../../decorator/router_register';
import BaseController from '../../base';
import { PageGetDto } from '../../../dto/comm';

/**
 * 请求追踪控制器
 */
export default class SysTaskController extends BaseController {

  @AdminRoute('/sys/task/page', 'get')
  async page() {
    const dto = await this.ctx.validate<PageGetDto>(PageGetDto, this.getQuery());
    this.res({
      data: {
        list: await this.service.admin.sys.task.page(dto.page - 1, dto.limit),
        pagination: {
          page: dto.page,
          size: dto.limit,
          total: await this.service.admin.sys.task.count(),
        },
      },
    });
  }

}
