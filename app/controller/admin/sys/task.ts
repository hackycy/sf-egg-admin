import { AdminRoute } from '../../../decorator/router_register';
import BaseController from '../../base';
import { PageGetDto } from '../../../dto/comm';
import { CreateTaskDto, UpdateTaskDto } from '../../../dto/admin/sys/task';

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

  @AdminRoute('/sys/task/add', 'post')
  async add() {
    const dto = await this.ctx.validate<CreateTaskDto>(CreateTaskDto, this.getQuery());
    await this.service.admin.sys.task.addOrUpdate(dto);
    this.res();
  }

  @AdminRoute('/sys/task/update', 'post')
  async update() {
    const dto = await this.ctx.validate<UpdateTaskDto>(UpdateTaskDto, this.getQuery());
    await this.service.admin.sys.task.addOrUpdate(dto);
    this.res();
  }

}
