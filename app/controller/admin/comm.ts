import BaseController from '../base';
import { AdminRoute } from '../../decorator/router_register';

/**
 * 通用功能控制器
 */
export default class CommController extends BaseController {

  /**
   * 获取图形验证码
   */
  @AdminRoute('/comm/captcha/img', 'get')
  async captchaByImg() {
    const result = await this.service.admin.comm.captchaImg(this.getQuery());
    this.res({
      data: result,
    });
  }

}
