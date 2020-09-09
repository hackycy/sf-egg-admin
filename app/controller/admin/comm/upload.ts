import BaseController from '../../base';
import { AdminRoute } from '../../../decorator/router_register';

/**
 * 上传控制器
 */
export default class UploadController extends BaseController {

  @AdminRoute('/upload/img', 'post')
  async uploadImg() {
    const file = this.ctx.request.files[0];
    const { cdnUrl } = this.config.qiniu;
    try {
      const data: any = await this.service.admin.comm.oss.upload(file);
      const { key, hash } = data;
      this.res({
        data: {
          url: `${cdnUrl}/${key}`,
          hash,
        },
      });

    } catch (e) {
      this.res({ code: 20001 });
    }
  }

}
