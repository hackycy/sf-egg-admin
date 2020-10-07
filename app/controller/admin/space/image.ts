import { AdminRoute } from '../../../decorator/router_register';
import BaseController from '../../base';
import * as _ from 'lodash';
import { QueryImageDto, CreateTypeDto, DeleteTypeDto, DeleteImageDto, UploadImageDto } from '../../../dto/admin/space/image';

/**
 * 图片空间控制器
 */
export default class ImageSpaceController extends BaseController {

  @AdminRoute('/space/image/page', 'get')
  async page() {
    const dto = await this.ctx.validate<QueryImageDto>(QueryImageDto, this.getQuery());
    this.res({
      data: {
        images: await this.service.admin.space.image.page(parseInt(dto.typeId), parseInt(dto.page) - 1, parseInt(dto.limit)),
        imageTotalCount: await this.service.admin.space.image.count(parseInt(dto.typeId)),
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
    const dto = await this.ctx.validate<CreateTypeDto>(CreateTypeDto);
    await this.service.admin.space.image.addType(dto.name);
    this.res();
  }

  @AdminRoute('/space/image/type/delete', 'post')
  async deleteType() {
    const dto = await this.ctx.validate<DeleteTypeDto>(DeleteTypeDto);
    const hasImage = await this.service.admin.space.image.findCurrentTypeHasImage(dto.typeId);
    if (hasImage) {
      this.res({
        code: 20003,
      });
      return;
    }
    await this.service.admin.space.image.deleteType(dto.typeId);
    this.res();
  }

  @AdminRoute('/space/image/delete', 'post')
  async deleteImage() {
    const dto = await this.ctx.validate<DeleteImageDto>(DeleteImageDto);
    await this.service.admin.space.image.deleteImageByIds(dto.imageIds);
    this.res();
  }

  @AdminRoute('/space/image/upload', 'post')
  async upload() {
    const dto = await this.ctx.validate<UploadImageDto>(UploadImageDto);
    const typeId = parseInt(dto.typeId);
    if (typeId === -1) {
      this.res({ code: 10000 });
      return;
    }
    const file = this.ctx.request.files[0];
    if (!file) {
      this.res({ code: 20001 });
      return;
    }
    const type = await this.service.admin.space.image.find(typeId);
    // 查找图片空间是否存在
    if (_.isEmpty(type)) {
      this.res({ code: 20002 });
      return;
    }
    const { cdnUrl } = this.config.qiniu;
    try {
      const data: any = await this.service.admin.comm.oss.upload(file, type!.name);
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
