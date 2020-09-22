import BaseService from '../../base';

/**
 * 图片空间Service
 */
export default class ImageSpaceService extends BaseService {

  /**
   * 查找所有图片空间类型
   */
  async type() {
    return await this.getRepo().admin.image.space.Type.find();
  }

  /**
   * 获取当前图片空间下的所有图片数量
   */
  async count(typeId: number | undefined) {
    return await this.getRepo().admin.image.space.Info.count(typeId === undefined ? {} : { typeId });
  }

  /**
   * 分页获取图片空间下的图片
   */
  async page(typeId: number | undefined, page: number, count: number) {
    const result = await this.getRepo().admin.image.space.Info.find({
      where: typeId === undefined ? {} : { typeId },
      order: {
        id: 'DESC',
      },
      take: count,
      skip: page * count,
    });
    return result;
  }

}
