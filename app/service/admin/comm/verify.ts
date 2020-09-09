import BaseService from '../../base';
import * as svgCaptcha from 'svg-captcha';
import * as _ from 'lodash';

/**
 * 通用功能Servce
 */
export default class VerifyService extends BaseService {

  /**
   * 生成图片验证码
   */
  async getImgCaptcha(params) {
    const svg = svgCaptcha.create({
      size: params.size ?? 4,
      color: true,
      noise: 4,
      width: params.width ?? 100,
      height: params.height ?? 50,
    });
    const result = {
      img: `data:image/svg+xml;base64,${new Buffer(svg.data).toString('base64')}`,
      id: this.getHelper().generateUUID(),
    };
    // 10分钟过期时间
    await this.app.redis.get('admin').set(`admin:captcha:img:${result.id}`, svg.text, 'EX', 60 * 10);
    return result;
  }

  /**
   * 校验验证码
   */
  async checkImgCaptcha(id: string, code: string) {
    const result = await this.app.redis.get('admin').get(`admin:captcha:img:${id}`);
    if (_.isEmpty(result)) {
      return false;
    }
    if (code.toLowerCase() !== result.toLowerCase()) {
      return false;
    }
    return true;
  }

  /**
   * 获取登录JWT
   * 返回null则账号密码有误，不存在该用户
   */
  async getLoginSign(username: string, password: string) {
    const decodeUserName = this.getHelper().aesDecrypt(username, this.config.aesSecret.front);
    const decodePassword = this.getHelper().aesDecrypt(password, this.config.aesSecret.front);
    const user = await this.getRepo().admin.sys.User.findOne({ username: decodeUserName, status: 1 });
    if (_.isEmpty(user)) {
      return null;
    }
    if (this.getHelper().aesDecrypt(user!.password, this.config.aesSecret.admin) !== decodePassword) {
      return null;
    }
    const perms = await this.service.admin.sys.menu.getPerms(user!.id);
    const jwtSign = this.getHelper().jwtSign({
      uid: parseInt(user!.id.toString()),
      pv: 1,
    }, {
      expiresIn: '24h',
    });
    await this.app.redis.get('admin').set(`admin:pv:${user!.id}`, 1);
    await this.app.redis.get('admin').set(`admin:token:${user!.id}`, jwtSign);
    await this.app.redis.get('admin').set(`admin:perms:${user!.id}`, JSON.stringify(perms));
    return jwtSign;
  }

  /**
   * 获取权限菜单
   */
  async getPermMenu(uid: number) {
    const menus = await this.service.admin.sys.menu.getMenus(uid);
    const perms = await this.service.admin.sys.menu.getPerms(uid);
    return { menus, perms };
  }

}
