import BaseService from '../../base';
import { In } from 'typeorm';

/**
 * 图片空间Service
 */
export default class ImageSpaceService extends BaseService {

  /**
   * 查找是否存在当前图片空间类型
   */
  async find(typeId: number) {
    const result = await this.getRepo().admin.image.space.Type.findOne({ id: typeId });
    return result;
  }

  /**
   * 查找所有图片空间类型
   */
  async type() {
    return await this.getRepo().admin.image.space.Type.find();
  }

  /**
   * 增加分类
   */
  async addType(name: string) {
    await this.getRepo().admin.image.space.Type.insert({ name });
  }

  /**
   * 删除分类
   */
  async deleteType(id: number) {
    await this.getRepo().admin.image.space.Type.delete(id);
  }

  /**
   * 查找当前分类下是否有图片
   */
  async findCurrentTypeHasImage(id: number) {
    const count = await this.getRepo().admin.image.space.Info.count({ typeId: id });
    return count > 0;
  }

  /**
   * 获取当前图片空间下的所有图片数量
   */
  async count(typeId: number) {
    return await this.getRepo().admin.image.space.Info.count(typeId === -1 ? {} : { typeId });
  }

  /**
   * 根据数据id删除图片
   */
  async deleteImageByIds(ids: number[]) {
    const result = await this.getRepo().admin.image.space.Info.find({ id: In(ids) });
    this.service.admin.comm.oss.delete(result);
    await this.getRepo().admin.image.space.Info.delete(ids);
  }

  /**
   * 分页获取图片空间下的图片
   */
  async page(typeId: number, page: number, count: number) {
    const result = await this.getRepo().admin.image.space.Info.find({
      where: typeId === -1 ? {} : { typeId },
      order: {
        id: 'DESC',
      },
      take: count,
      skip: page * count,
    });
    return result;
  }

  /**
   * add info item
   */
  async add(typeId: number, url: string, extra?: string) {
    await this.getRepo().admin.image.space.Info.save({ typeId, url, extra });
  }

}
