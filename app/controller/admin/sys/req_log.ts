import { AdminRoute } from '../../../decorator/router_register';
import { SearchLogDto } from '../../../dto/admin/sys/log';
import BaseController from '../../base';
import { PageGetDto } from '../../../dto/comm';

/**
 * 请求追踪控制器
 */
export default class SysLogController extends BaseController {

  @AdminRoute('/sys/log/page', 'get')
  async page() {
    const dto = await this.ctx.validate<PageGetDto>(PageGetDto, this.getQuery());
    this.res({
      data: {
        list: await this.service.admin.sys.log.page(dto.page - 1, dto.limit),
        pagination: {
          page: dto.page,
          size: dto.limit,
          total: await this.service.admin.sys.log.count(),
        },
      },
    });
  }

  @AdminRoute('/sys/log/search', 'get')
  async search() {
    const dto = await this.ctx.validate<SearchLogDto>(SearchLogDto, this.getQuery());
    this.res({
      data: await this.service.admin.sys.log.search(dto.page - 1, dto.limit, dto.q),
    });
  }

}
