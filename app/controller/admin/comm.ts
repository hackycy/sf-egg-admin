import BaseController from '../base';
import { AdminRoute } from '../../decorator/router_register';

/**
 * 通用功能控制器
 */
export default class CommController extends BaseController {

  /**
   * 获取图形验证码
   */
  @AdminRoute('/captcha/img', 'get')
  async captchaByImg() {
    const result = await this.service.admin.comm.getImgCaptcha(this.getQuery());
    this.res({
      data: result,
    });
  }

  /**
   * 系统用户登录
   */
  @AdminRoute('/login', 'post')
  async login() {
    const errors = this.app.validator.validate({
      username: 'string',
      password: 'string',
      captchaId: 'string',
      verifyCode: 'string',
    }, this.getBody());
    if (errors) {
      this.res({
        code: 10000,
      });
      return;
    }
    const { username, password, captchaId, verifyCode } = this.getBody();
    const success = await this.service.admin.comm.checkImgCaptcha(captchaId, verifyCode);
    if (!success) {
      this.res({
        code: 10002,
      });
      return;
    }
    const sign = await this.service.admin.comm.getLoginSign(username, password);
    if (!sign) {
      this.res({
        code: 10003,
      });
      return;
    }
    this.res({
      data: {
        token: sign,
      },
    });
  }

  /**
   * 获取权限菜单
   */
  @AdminRoute('/permmenu', 'get')
  async permmenu() {
    this.res({
      data: await this.service.admin.comm.getPermMenu(this.ctx.token.uid),
    });
  }

}
