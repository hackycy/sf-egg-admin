import { AdminRoute } from '../../../decorator/router_register';
import BaseController from '../../base';
import { PageGetDto } from '../../../dto/comm';

/**
 * 任务日志控制器
 */
export default class SysTaskLogController extends BaseController {

  /**
   * @api {get} /admin/sys/task-log/page 获取任务日志列表
   * @apiGroup 任务调度
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiUse Page
   * @apiSuccess {SysTaskLog[]} data.list 任务日志列表
   */
  @AdminRoute('/sys/task-log/page', 'get')
  async page() {
    const dto = await this.ctx.validate<PageGetDto>(PageGetDto, this.getQuery());
    this.res({
      data: {
        list: await this.service.admin.sys.taskLog.page(dto.page - 1, dto.limit),
        pagination: {
          page: dto.page,
          size: dto.limit,
          total: await this.service.admin.sys.taskLog.count(),
        },
      },
    });
  }

}
