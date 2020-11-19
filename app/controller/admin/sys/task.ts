import { AdminRoute } from '../../../decorator/router_register';
import BaseController from '../../base';
import { PageGetDto } from '../../../dto/comm';
import { CreateTaskDto, UpdateTaskDto, CheckIdTaskDto } from '../../../dto/admin/sys/task';

/**
 * 请求追踪控制器
 */
export default class SysTaskController extends BaseController {

  /**
   * @api {get} /admin/sys/task/page 获取任务列表
   * @apiGroup 任务调度
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiUse Page
   * @apiSuccess {SysTask[]} data.list 任务列表
   */
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

  /**
   * @api {post} /admin/sys/task/add 新增任务
   * @apiGroup 任务调度
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiParam {String} name 任务名称
   * @apiParam {String} service 调用服务路径
   * @apiParam {Number} type 任务类型
   * @apiParam {Number} status 任务状态
   * @apiParam {String} startTime 启动时间
   * @apiParam {String} endTime 启动时间
   * @apiParam {Number} limit 最大运行次数，小于等于0则不限次数
   * @apiParam {String} cron cron表达式
   * @apiParam {Number} every 间隔时间
   * @apiParam {String} data 运行参数，JSON格式的字符串
   * @apiParam {String} remark 任务备注
   */
  @AdminRoute('/sys/task/add', 'post')
  async add() {
    const dto = await this.ctx.validate<CreateTaskDto>(CreateTaskDto);
    await this.service.admin.sys.task.addOrUpdate(dto);
    this.res();
  }

  /**
   * @api {post} /admin/sys/task/update 更新任务
   * @apiGroup 任务调度
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiParam {String} name 任务名称
   * @apiParam {String} service 调用服务路径
   * @apiParam {Number} type 任务类型
   * @apiParam {Number} status 任务状态
   * @apiParam {String} startTime 启动时间
   * @apiParam {String} endTime 启动时间
   * @apiParam {Number} limit 最大运行次数，小于等于0则不限次数
   * @apiParam {String} cron cron表达式
   * @apiParam {Number} every 间隔时间
   * @apiParam {String} data 运行参数，JSON格式的字符串
   * @apiParam {String} remark 任务备注
   * @apiParam {Number} id 任务编号
   */
  @AdminRoute('/sys/task/update', 'post')
  async update() {
    const dto = await this.ctx.validate<UpdateTaskDto>(UpdateTaskDto);
    await this.service.admin.sys.task.addOrUpdate(dto);
    this.res();
  }

  /**
   * @api {get} /admin/sys/task/info 获取任务信息
   * @apiGroup 任务调度
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiParam {Number} id 任务编号
   * @apiSuccess {SysTask} data 任务列表
   */
  @AdminRoute('/sys/task/info', 'post')
  async info() {
    const dto = await this.ctx.validate<CheckIdTaskDto>(CheckIdTaskDto);
    this.res({
      data: await this.service.admin.sys.task.info(dto.id),
    });
  }

  /**
   * @api {post} /admin/sys/task/once 手动执行一次任务
   * @apiGroup 任务调度
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiParam {Number} id 任务编号
   */
  @AdminRoute('/sys/task/once', 'post')
  async once() {
    const dto = await this.ctx.validate<CheckIdTaskDto>(CheckIdTaskDto);
    const task = await this.service.admin.sys.task.info(dto.id);
    await this.service.admin.sys.task.once(task!);
    this.res();
  }

  /**
   * @api {post} /admin/sys/task/stop 停止任务
   * @apiGroup 任务调度
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiParam {Number} id 任务编号
   */
  @AdminRoute('/sys/task/stop', 'post')
  async stop() {
    const dto = await this.ctx.validate<CheckIdTaskDto>(CheckIdTaskDto);
    const task = await this.service.admin.sys.task.info(dto.id);
    await this.service.admin.sys.task.stop(task!);
    this.res();
  }

  /**
   * @api {post} /admin/sys/task/start 启动任务
   * @apiGroup 任务调度
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiParam {Number} id 任务编号
   */
  @AdminRoute('/sys/task/start', 'post')
  async start() {
    const dto = await this.ctx.validate<CheckIdTaskDto>(CheckIdTaskDto);
    const task = await this.service.admin.sys.task.info(dto.id);
    await this.service.admin.sys.task.start(task!);
    this.res();
  }

  /**
   * @api {post} /admin/sys/task/delete 删除任务
   * @apiGroup 任务调度
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiParam {Number} id 任务编号
   */
  @AdminRoute('/sys/task/delete', 'post')
  async delete() {
    const dto = await this.ctx.validate<CheckIdTaskDto>(CheckIdTaskDto);
    const task = await this.service.admin.sys.task.info(dto.id);
    await this.service.admin.sys.task.delete(task!);
    this.res();
  }

}
