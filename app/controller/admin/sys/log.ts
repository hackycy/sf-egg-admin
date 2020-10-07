import { AdminRoute } from '../../../decorator/router_register';
import { SearchLogDto } from '../../../dto/admin/sys/log';
import BaseController from '../../base';
import { PageGetDto } from '../../../dto/comm';

/**
 * 系统日志控制器
 */
export default class SysLogController extends BaseController {

  @AdminRoute('/sys/log/page', 'get')
  async page() {
    const dto = await this.ctx.validate<PageGetDto>(PageGetDto, this.getQuery());
    this.res({
      data: {
        logs: await this.service.admin.sys.log.page(parseInt(dto.page) - 1, parseInt(dto.limit)),
        count: await this.service.admin.sys.log.count(),
      },
    });
  }

  @AdminRoute('/sys/log/search', 'get')
  async search() {
    const dto = await this.ctx.validate<SearchLogDto>(SearchLogDto, this.getQuery());
    this.res({
      data: await this.service.admin.sys.log.search(parseInt(dto.page) - 1, parseInt(dto.limit), dto.q),
    });
  }

}
