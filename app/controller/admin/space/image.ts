import { AdminRoute } from '../../../decorator/router_register';
import BaseController from '../../base';

/**
 * 图片空间控制器
 */
export default class ImageSpaceController extends BaseController {

  @AdminRoute('/image/space/page', 'get')
  async page() {
    // const errors = this.app.validator.validate({
    //   typeId: 'string',
    // }, this.getQuery());
    // if (errors) {
    //   this.res({
    //     code: 10000,
    //   });
    //   return;
    // }
    // 不穿typeId默认查找全部
    const { page = 1, limit = 25, typeId } = this.getQuery();
    if (page < 1 || limit <= 0) {
      this.res({
        code: 10000,
      });
      return;
    }
    this.res({
      data: {
        images: await this.service.admin.space.image.page(typeId, parseInt(page) - 1, parseInt(limit)),
        imageTotalCount: await this.service.admin.space.image.count(typeId),
      },
    });
  }

  @AdminRoute('/image/sapce/type', 'get')
  async type() {
    this.res({
      data: await this.service.admin.space.image.type(),
    });
  }

  @AdminRoute('/image/space/upload', 'post')
  async upload() {
    const file = this.ctx.request.files[0];
    if (!file) {
      this.res({ code: 20001 });
    }
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
