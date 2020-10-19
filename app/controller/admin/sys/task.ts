import { AdminRoute } from '../../../decorator/router_register';
import BaseController from '../../base';
import { PageGetDto } from '../../../dto/comm';
import { CreateTaskDto, UpdateTaskDto, CheckIdTaskDto } from '../../../dto/admin/sys/task';

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
    const dto = await this.ctx.validate<CreateTaskDto>(CreateTaskDto);
    await this.service.admin.sys.task.addOrUpdate(dto);
    this.res();
  }

  @AdminRoute('/sys/task/update', 'post')
  async update() {
    const dto = await this.ctx.validate<UpdateTaskDto>(UpdateTaskDto);
    await this.service.admin.sys.task.addOrUpdate(dto);
    this.res();
  }

  @AdminRoute('/sys/task/info', 'post')
  async info() {
    const dto = await this.ctx.validate<CheckIdTaskDto>(CheckIdTaskDto);
    this.res({
      data: await this.service.admin.sys.task.info(dto.id),
    });
  }

  @AdminRoute('/sys/task/once', 'post')
  async once() {
    const dto = await this.ctx.validate<CheckIdTaskDto>(CheckIdTaskDto);
    const task = await this.service.admin.sys.task.info(dto.id);
    await this.service.admin.sys.task.once(task!);
    this.res();
  }

  @AdminRoute('/sys/task/stop', 'post')
  async stop() {
    const dto = await this.ctx.validate<CheckIdTaskDto>(CheckIdTaskDto);
    const task = await this.service.admin.sys.task.info(dto.id);
    await this.service.admin.sys.task.stop(task!);
    this.res();
  }

  @AdminRoute('/sys/task/start', 'post')
  async start() {
    const dto = await this.ctx.validate<CheckIdTaskDto>(CheckIdTaskDto);
    const task = await this.service.admin.sys.task.info(dto.id);
    await this.service.admin.sys.task.start(task!);
    this.res();
  }

  @AdminRoute('/sys/task/delete', 'post')
  async delete() {
    const dto = await this.ctx.validate<CheckIdTaskDto>(CheckIdTaskDto);
    const isRunning = await this.service.admin.sys.task.existJob(String(dto.id));
    if (isRunning) {
      this.res({
        code: 10014,
      });
      return;
    }
    await this.service.admin.sys.task.delete(dto.id);
    this.res();
  }

}
