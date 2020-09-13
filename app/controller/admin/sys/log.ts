import BaseController from '../../base';

/**
 * 系统日志控制器
 */
export default class SysLogController extends BaseController {

  /**
   * 分页查询日志
   */
  async page() {
    const { page = 1, limit = 25 } = this.getQuery();
    if (page < 1 || limit <= 0) {
      this.res({
        code: 10000,
      });
      return;
    }
    this.res();
  }

}
