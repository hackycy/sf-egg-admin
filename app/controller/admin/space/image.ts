import { AdminRoute } from '../../../decorator/router_register';
import BaseController from '../../base';
import * as _ from 'lodash';
import { QueryImageDto, CreateTypeDto, DeleteTypeDto, DeleteImageDto, UploadImageDto } from '../../../dto/admin/space/image';

/**
 * 图片空间控制器
 */
export default class ImageSpaceController extends BaseController {

  /**
   * @api {get} /admin/space/image/page 获取图片信息列表
   * @apiGroup 图片空间
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiParam {Number} typeId 类别编号
   * @apiUse Page
   * @apiSuccess {ImageSpaceInfo[]} data.list 图片信息列表
   */
  @AdminRoute('/space/image/page', 'get')
  async page() {
    const dto = await this.ctx.validate<QueryImageDto>(QueryImageDto, this.getQuery());
    this.res({
      data: {
        list: await this.service.admin.space.image.page(parseInt(dto.typeId), dto.page - 1, dto.limit),
        pagination: {
          page: dto.page,
          size: dto.limit,
          total: await this.service.admin.space.image.count(parseInt(dto.typeId)),
        },
      },
    });
  }

  /**
   * @api {get} /admin/space/image/type/list 获取图片空间类别列表
   * @apiGroup 图片空间
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiSuccess {Array} data 图片空间类别列表
   */
  @AdminRoute('/space/image/type/list', 'get')
  async typeList() {
    this.res({
      data: await this.service.admin.space.image.type(),
    });
  }

  /**
   * @api {post} /admin/space/image/type/add 新增图片空间类别
   * @apiGroup 图片空间
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiParam {String} name 类别名称
   */
  @AdminRoute('/space/image/type/add', 'post')
  async addType() {
    const dto = await this.ctx.validate<CreateTypeDto>(CreateTypeDto);
    await this.service.admin.space.image.addType(dto.name);
    this.res();
  }

  /**
   * @api {post} /admin/space/image/type/delete 删除图片空间类别
   * @apiGroup 图片空间
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiParam {Number} typeId 类别编号
   */
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

  /**
   * @api {post} /admin/space/image/delete 删除空间类别下的图片列表
   * @apiGroup 图片空间
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiParam {Number[]} imageIds 图片ID列表
   */
  @AdminRoute('/space/image/delete', 'post')
  async deleteImage() {
    const dto = await this.ctx.validate<DeleteImageDto>(DeleteImageDto);
    await this.service.admin.space.image.deleteImageByIds(dto.imageIds);
    this.res();
  }

  /**
   * @api {post} /admin/space/image/upload 图片上传(表单)
   * @apiGroup 图片空间
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiParam {Number} typeId 图片ID列表
   */
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
