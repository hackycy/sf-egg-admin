import { AdminRoute } from '../../../decorator/router_register';
import BaseController from '../../base';

/**
 * 图片空间控制器
 */
export default class ImageSpaceController extends BaseController {

  @AdminRoute('/space/image/page', 'get')
  async page() {
    const errors = this.app.validator.validate({
      typeId: 'string',
    }, this.getQuery());
    if (errors) {
      this.res({
        code: 10000,
      });
      return;
    }
    // typeIda为-1时则查找全部
    const { page = 1, limit = 8, typeId = -1 } = this.getQuery();
    if (page < 1 || limit <= 0) {
      this.res({
        code: 10000,
      });
      return;
    }
    this.res({
      data: {
        images: await this.service.admin.space.image.page(parseInt(typeId), parseInt(page) - 1, parseInt(limit)),
        imageTotalCount: await this.service.admin.space.image.count(parseInt(typeId)),
      },
    });
  }

  @AdminRoute('/space/image/type/list', 'get')
  async typeList() {
    this.res({
      data: await this.service.admin.space.image.type(),
    });
  }

  @AdminRoute('/space/image/type/add', 'post')
  async addType() {
    const errors = this.app.validator.validate({
      name: 'string',
    }, this.getBody());
    if (errors) {
      this.res({
        code: 10000,
      });
      return;
    }
    await this.service.admin.space.image.addType(this.getBody().name);
    this.res();
  }

  @AdminRoute('/space/image/type/delete', 'post')
  async deleteType() {
    const errors = this.app.validator.validate({
      typeId: 'int',
    }, this.getBody());
    if (errors) {
      this.res({
        code: 10000,
      });
      return;
    }
    const { typeId } = this.getBody();
    const hasImage = await this.service.admin.space.image.findCurrentTypeHasImage(typeId);
    if (hasImage) {
      this.res({
        code: 20003,
      });
      return;
    }
    await this.service.admin.space.image.deleteType(typeId);
    this.res();
  }

  @AdminRoute('/space/image/delete', 'post')
  async deleteImage() {
    this.res();
  }

  @AdminRoute('/space/image/upload', 'post')
  async upload() {
    const errors = this.app.validator.validate({
      typeId: 'string',
    }, this.getBody());
    if (errors) {
      this.res({
        code: 10000,
      });
      return;
    }
    let { typeId } = this.getBody();
    typeId = parseInt(typeId);
    if (typeId === -1) {
      this.res({
        code: 10000,
      });
      return;
    }
    const existsSpace = await this.service.admin.space.image.find(typeId);
    // 查找图片空间是否存在
    if (!existsSpace) {
      this.res({
        code: 20002,
      });
      return;
    }
    const file = this.ctx.request.files[0];
    if (!file) {
      this.res({ code: 20001 });
    }
    const { cdnUrl } = this.config.qiniu;
    try {
      const data: any = await this.service.admin.comm.oss.upload(file);
      const { key, hash } = data;
      const url = `${cdnUrl}/${key}`;
      await this.service.admin.space.image.add(typeId, url, JSON.stringify({ key, hash }));
      this.res({
        data: {
          url,
          hash,
        },
      });
    } catch (e) {
      this.res({ code: 20001 });
    }
  }

}
