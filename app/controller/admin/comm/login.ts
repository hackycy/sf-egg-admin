import BaseController from '../../base';
import { AdminRoute } from '../../../decorator/router_register';
import { LoginInfoDto, UpdatePersonInfoDto } from '../../../dto/admin/verify';

/**
 * 通用功能控制器
 */
export default class CommController extends BaseController {

  /**
   * @api {get} /admin/captcha/img 获取图片验证码
   * @apiGroup 登陆验证类
   * @apiParam {Number} [width=100] 图片宽度
   * @apiParam {Number} [height=50] 图片高度
   * @apiUse BaseRes
   * @apiUse Auth
   * @apiSuccess {String} data.img base64格式的验证码图片字符串
   * @apiSuccess {String} data.id 验证码对应ID
   */
  @AdminRoute('/captcha/img', 'get')
  async captchaByImg() {
    const result = await this.service.admin.comm.verify.getImgCaptcha(this.getQuery());
    this.res({
      data: result,
    });
  }

  /**
   * @api {post} /admin/login 管理员登陆
   * @apiGroup 登陆验证类
   * @apiParam {String} username 用户名，AES加密
   * @apiParam {String} password 密码，AES加密
   * @apiParam {String} captchaId 验证码ID
   * @apiParam {String} verifyCode 填写的验证码
   * @apiUse BaseRes
   * @apiSuccess {String} data.token 用户Token
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

  /**
   * @api {post} /admin/logout 管理员登出
   * @apiGroup 登陆验证类
   * @apiUse Auth
   * @apiUse BaseRes
   */
  @AdminRoute('/logout', 'post')
  async logout() {
    await this.service.admin.comm.verify.clearLoginStatus(this.ctx.token.uid);
    this.res();
  }

  /**
   * @api {get} /admin/permmenu 获取权限及菜单
   * @apiGroup 登陆验证类
   * @apiUse BaseRes
   * @apiUse Auth
   * @apiSuccess {Array} data.menus 菜单
   * @apiSuccess {Array} data.perms 权限描述
   */
  @AdminRoute('/permmenu', 'get')
  async permmenu() {
    this.res({
      data: await this.service.admin.comm.verify.getPermMenu(this.ctx.token.uid),
    });
  }

  /**
   * @api {get} /admin/person 获取当前登录用户信息
   * @apiGroup 登陆验证类
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiSuccess {Object} data 管理员信息实体类
   */
  @AdminRoute('/person', 'get')
  async person() {
    this.res({
      data: await this.service.admin.sys.user.person(this.ctx.token.uid),
    });
  }

  /**
   * @api {post} /admin/person 更新管理员信息
   * @apiGroup 登陆验证类
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiParam {String} name 名称
   * @apiParam {String} nickName 别名
   * @apiParam {String} email 邮箱
   * @apiParam {String} phone 手机
   * @apiParam {String} originPassword 更改前密码
   * @apiParam {String} newPassword 新密码
   * @apiParam {String} remark 备注
   * @apiParam {String} headImg 头像
   */
  @AdminRoute('/person', 'post')
  async personUpdate() {
    const dto = await this.ctx.validate<UpdatePersonInfoDto>(UpdatePersonInfoDto);
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
