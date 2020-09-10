import BaseService from '../../base';
import * as _ from 'lodash';
import { In } from 'typeorm';

/**
 * 系统部门Service
 */
export default class SysDeptService extends BaseService {

  /**
   * 获取所有部门
   */
  async list() {
    return await this.getRepo().admin.sys.Department.find();
  }

  /**
   * 转移部门
   */
  async transfer(userIds: number[], deptId: number) {
    await this.getRepo().admin.sys.User.update({ id: In(userIds) }, { departmentId: deptId });
  }

  /**
   * 根据当前角色id获取部门列表
   */
  async getDepts(uid: number) {
    const roleIds = await this.service.admin.sys.role.getRoleIdByUser(uid);
    let depts: any = [];
    if (_.includes(roleIds, this.config.rootRoleId)) {
      // root find all
      depts = await this.getRepo().admin.sys.Department.find();
    } else {
      // [ 1, 2, 3 ] role find
      depts = await this.getRepo().admin.sys.Department.createQueryBuilder('dept')
        .innerJoinAndSelect('sys_role_department', 'role_dept', 'dept.id = role_dept.department_id')
        .andWhere('role_dept.role_id IN (:...roldIds)', { roldIds: roleIds })
        .getMany();
    }
    return depts;
  }

}
