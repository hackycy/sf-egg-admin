import BaseService from '../../base';
import * as _ from 'lodash';
import { Not, In } from 'typeorm';
import { CreateRoleDto, UpdateRoleDto } from '../../../dto/admin/sys/role';

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
   * 列举所有角色条数：除去超级管理员
   */
  async count() {
    const count = await this.getRepo().admin.sys.Role.count({ id: Not(this.config.rootRoleId) });
    return count;
  }

  /**
   * 根据角色获取角色信息
   */
  async info(rid: number) {
    const roleInfo = await this.getRepo().admin.sys.Role.findOne({ id: rid });
    const menus = await this.getRepo().admin.sys.RoleMenu.find({ roleId: rid });
    const depts = await this.getRepo().admin.sys.RoleDepartment.find({ roleId: rid });
    return { roleInfo, menus, depts };
  }

  /**
   * 根据角色Id数组删除
   */
  async delete(roleIds: number[]) {
    if (_.includes(roleIds, this.config.rootRoleId)) {
      throw new Error('Not Support Delete Root');
    }
    await this.ctx.ormManager.transaction(async manager => {
      await manager.delete(this.getEntity().admin.sys.Role, roleIds);
      await manager.delete(this.getEntity().admin.sys.RoleMenu, { roleId: In(roleIds) });
      await manager.delete(this.getEntity().admin.sys.RoleDepartment, { roleId: In(roleIds) });
      // TODO：需要连同用户一并删除
    });
  }

  /**
   * 增加角色
   */
  async add(param: CreateRoleDto, uid: number) {
    const { name, label, remark, menus, depts } = param;
    const role = await this.getRepo().admin.sys.Role.insert({ name, label, remark, userId: String(uid) });
    const { identifiers } = role;
    const roleId = parseInt(identifiers[0].id);
    if (menus && menus.length > 0) {
      // 关联菜单
      const insertRows = menus.map(m => {
        return {
          roleId,
          menuId: m,
        };
      });
      await this.getRepo().admin.sys.RoleMenu.insert(insertRows);
    }
    if (depts && depts.length > 0) {
      // 关联部门
      const insertRows = depts.map(d => {
        return {
          roleId,
          departmentId: d,
        };
      });
      await this.getRepo().admin.sys.RoleDepartment.insert(insertRows);
    }
    return { roleId };
  }

  /**
   * 更新角色信息
   */
  async update(param: UpdateRoleDto) {
    const { roleId, name, label, remark, menus, depts } = param;
    const role = await this.getRepo().admin.sys.Role.save({ id: roleId, name, label, remark });
    const originDeptRows = await this.getRepo().admin.sys.RoleDepartment.find({ roleId });
    const originMenuRows = await this.getRepo().admin.sys.RoleMenu.find({ roleId });
    const originMenuIds = originMenuRows.map(e => { return e.menuId; });
    const originDeptIds = originDeptRows.map(e => { return e.departmentId; });
    // 开始对比差异
    const insertMenusRowIds = _.difference(menus, originMenuIds);
    const deleteMenusRowIds = _.difference(originMenuIds, menus);
    const insertDeptRowIds = _.difference(depts, originDeptIds);
    const deleteDeptRowIds = _.difference(originDeptIds, depts);
    // using transaction
    await this.ctx.ormManager.transaction(async manager => {
      // 菜单
      if (insertMenusRowIds.length > 0) {
        // 有条目更新
        const insertRows = insertMenusRowIds.map(e => {
          return {
            roleId,
            menuId: e,
          };
        });
        await manager.insert(this.getEntity().admin.sys.RoleMenu, insertRows);
      }
      if (deleteMenusRowIds.length > 0) {
        // 有条目需要删除
        const realDeleteRowIds = _.filter(originMenuRows, e => {
          return _.includes(deleteMenusRowIds, e.menuId);
        }).map(e => { return e.id; });
        await manager.delete(this.getEntity().admin.sys.RoleMenu, realDeleteRowIds);
      }
      // 部门
      if (insertDeptRowIds.length > 0) {
        // 有条目更新
        const insertRows = insertDeptRowIds.map(e => {
          return {
            roleId,
            departmentId: e,
          };
        });
        await manager.insert(this.getEntity().admin.sys.RoleDepartment, insertRows);
      }
      if (deleteDeptRowIds.length > 0) {
        // 有条目需要删除
        const realDeleteRowIds = _.filter(originDeptRows, e => {
          return _.includes(deleteDeptRowIds, e.departmentId);
        }).map(e => { return e.id; });
        await manager.delete(this.getEntity().admin.sys.RoleDepartment, realDeleteRowIds);
      }
    });
    return role;
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
    const result = await this.getRepo().admin.sys.UserRole.find({
      where: {
        userId: id,
      },
    });
    if (!_.isEmpty(result)) {
      return _.map(result, v => {
        return v.roleId;
      });
    }
    return [];
  }

  /**
   * 根据角色ID列表查找关联用户ID
   */
  async countUserIdByRole(ids: number[]) {
    if (_.includes(ids, this.config.rootRoleId)) {
      throw new Error('Not Support Delete Root');
    }
    return await this.getRepo().admin.sys.UserRole.count({ roleId: In(ids) });
  }

}
