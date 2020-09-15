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
   * 根据ID查找部门信息
   */
  async info(id: number) {
    const department = await this.getRepo().admin.sys.Department.findOne({ id });
    let parentDepartment: any = null;
    if (department!.parentId) {
      parentDepartment = await this.getRepo().admin.sys.Department.findOne({ id: department!.parentId });
    }
    return { department, parentDepartment };
  }

  /**
   * 更新部门信息
   */
  async update(param: any) {
    const { id } = param;
    delete param.id;
    if (param.parentId === -1) {
      delete param.parentId;
    }
    await this.getRepo().admin.sys.Department.update(id, param);
  }

  /**
   * 转移部门
   */
  async transfer(userIds: number[], deptId: number) {
    await this.getRepo().admin.sys.User.update({ id: In(userIds) }, { departmentId: deptId });
  }

  /**
   * 新增部门
   */
  async add(deptName: string, parentDeptId: number) {
    await this.getRepo().admin.sys.Department.insert({ name: deptName, parentId: parentDeptId === -1 ? undefined : parentDeptId });
  }

  /**
   * 根据ID删除部门
   */
  async delete(departmentId: number) {
    await this.getRepo().admin.sys.Department.delete(departmentId);
  }

  /**
   * 根据部门查询关联的用户ID
   */
  async countUserByDeptId(id: number) {
    return await this.getRepo().admin.sys.User.count({ departmentId: id });
  }

  /**
   * 根据部门查询关联的角色
   */
  async countRoleByDeptId(id: number) {
    return await this.getRepo().admin.sys.Role_department.count({ departmentId: id });
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
