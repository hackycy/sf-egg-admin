import BaseService from '../base';
import * as svgCaptcha from 'svg-captcha';

/**
 * 通用功能Servce
 */
export default class CommService extends BaseService {

  /**
   * 生成图片验证
   */
  async captchaImg(params) {
    const svg = svgCaptcha.create({
      size: params.size ?? 4,
      color: true,
      noise: 4,
      width: params.width ?? 100,
      height: params.height ?? 50,
    });
    const result = {
      img: svg.data,
      id: this.getHelper().generateUUID(),
    };
    await this.app.redis.get('admin').set(`admin:captcha:img:${result.id}`, svg.text);
    return result;
  }

}
