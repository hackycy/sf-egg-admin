import BaseController from '../../base';
import { AdminRoute } from '../../../decorator/router_register';
import { LoginInfoDto, PersonInfoDto } from '../../../dto/admin/verify';

/**
 * 通用功能控制器
 */
export default class CommController extends BaseController {

  /**
   * 获取图形验证码
   */
  @AdminRoute('/captcha/img', 'get')
  async captchaByImg() {
    const result = await this.service.admin.comm.verify.getImgCaptcha(this.getQuery());
    this.res({
      data: result,
    });
  }

  /**
   * 系统用户登录
   */
  @AdminRoute('/login', 'post')
  async login() {
    const dto = await this.ctx.validate<LoginInfoDto>(LoginInfoDto);
    // const { username, password, captchaId, verifyCode } = info;
    const success = await this.service.admin.comm.verify.checkImgCaptcha(dto.captchaId, dto.verifyCode);
    if (!success) {
      this.res({
        code: 10002,
      });
      return;
    }
    const sign = await this.service.admin.comm.verify.getLoginSign(dto.username, dto.password);
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

  @AdminRoute('/logout', 'post')
  async logout() {
    await this.service.admin.comm.verify.clearLoginStatus(this.ctx.token.uid);
    this.res();
  }

  /**
   * 获取权限菜单
   */
  @AdminRoute('/permmenu', 'get')
  async permmenu() {
    this.res({
      data: await this.service.admin.comm.verify.getPermMenu(this.ctx.token.uid),
    });
  }

  /**
   * 获取当前登录用户信息
   */
  @AdminRoute('/person', 'get')
  async person() {
    this.res({
      data: await this.service.admin.sys.user.person(this.ctx.token.uid),
    });
  }

  @AdminRoute('/person', 'post')
  async personUpdate() {
    const dto = await this.ctx.validate<PersonInfoDto>(PersonInfoDto);
    const result = await this.service.admin.sys.user.personUpdate(this.ctx.token.uid, dto);
    if (!result) {
      this.res({
        code: 10011,
      });
    } else {
      this.res();
    }
  }

}
