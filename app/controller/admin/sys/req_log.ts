import { AdminRoute } from '../../../decorator/router_register';
import { SearchLogDto } from '../../../dto/admin/sys/log';
import BaseController from '../../base';
import { PageGetDto } from '../../../dto/comm';

/**
 * 请求追踪控制器
 */
export default class SysReqLogController extends BaseController {

  /**
   * @api {get} /admin/sys/req-log/page 获取请求追踪列表
   * @apiGroup 请求追踪
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiUse Page
   * @apiSuccess {SysReqLog[]} data.list 请求追踪列表
   */
  @AdminRoute('/sys/req-log/page', 'get')
  async page() {
    const dto = await this.ctx.validate<PageGetDto>(PageGetDto, this.getQuery());
    this.res({
      data: {
        list: await this.service.admin.sys.reqLog.page(dto.page - 1, dto.limit),
        pagination: {
          page: dto.page,
          size: dto.limit,
          total: await this.service.admin.sys.reqLog.count(),
        },
      },
    });
  }

  /**
   * @api {get} /admin/sys/req-log/search 请求追踪搜索
   * @apiGroup 请求追踪
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiParam {String} q 条件
   */
  @AdminRoute('/sys/req-log/search', 'get')
  async search() {
    const dto = await this.ctx.validate<SearchLogDto>(SearchLogDto, this.getQuery());
    this.res({
      data: await this.service.admin.sys.reqLog.search(dto.page - 1, dto.limit, dto.q),
    });
  }

}
