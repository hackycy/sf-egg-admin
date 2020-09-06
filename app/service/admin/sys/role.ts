import BaseService from '../../base';
import * as _ from 'lodash';
import { Not } from 'typeorm';

/**
 * 系统-角色
 */
export default class SysRoleService extends BaseService {

  /**
   * 列举所有角色：除去超级管理员
   */
  async list() {
    const result = await this.getRepo().admin.sys.Role.find({ id: Not(this.config.rootRoleId) });
    return result;
  }

  /**
   * 列举所有角色条数
   */
  async count() {
    const count = await this.getRepo().admin.sys.Role.count({ id: Not(this.config.rootRoleId) });
    return count;
  }

  /**
   * 根据角色Id数组删除
   */
  async delete(roleIds: number[]) {
    if (_.includes(roleIds, this.config.rootRoleId)) {
      throw new Error('Not Support Delete Root');
    }
    const result = await this.getRepo().admin.sys.Role.delete(roleIds);
    return result;
  }

  /**
   * 分页加载角色信息
   */
  async page(page: number, count: number) {
    const result = await this.getRepo().admin.sys.Role.find({
      where: {
        id: Not(this.config.rootRoleId),
      },
      order: {
        id: 'ASC',
      },
      take: count,
      skip: page * count,
    });
    return result;
  }

  /**
   * 根据用户id查找角色信息
   */
  async getRoleIdByUser(id: number) {
    const result = await this.getRepo().admin.sys.User_role.find({
      where: {
        userId: id,
      },
    });
    if (!_.isEmpty(result)) {
      return _.map(result, v => {
        return parseInt(v.roleId);
      });
    }
    return [];
  }

  /**
   * 新增角色信息
   */
  async add(param: any) {
    const user = await this.service.admin.sys.user.info(this.ctx.user.uid);
    param.userId = user?.name;
    await this.getRepo().admin.sys.Role.save(param);
  }

}
