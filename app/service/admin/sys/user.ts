import * as _ from 'lodash';
import BaseService from '../../base';
import { Not, In } from 'typeorm';
import { UpdatePersonInfoDto } from '../../../dto/admin/verify';
import { CreateUserDto, UpdateUserDto } from '../../../dto/admin/sys/user';

/**
 * 系统-用户
 */
export default class SysUserService extends BaseService {

  /**
   * 查询用户个人信息
   */
  async person(uid: number) {
    const user: any = await this.getRepo().admin.sys.User.findOne({ id: uid });
    if (!_.isEmpty(user)) {
      delete user.departmentId;
      delete user.status;
      // delete user.remark;
      delete user.password;
    }
    return user;
  }

  /**
   * 更新个人信息
   */
  async personUpdate(uid: number, param: UpdatePersonInfoDto) {
    const { name, nickName, email, phone, originPassword, newPassword, remark, headImg } = param;
    let savePassword: string | undefined;
    if (originPassword && newPassword) {
      const user = await this.getRepo().admin.sys.User.findOne({ id: uid });
      const decodePassword = this.getHelper().aesDecrypt(user!.password, this.config.aesSecret.admin);
      const decodeOriginPassword = this.getHelper().aesDecrypt(originPassword, this.config.aesSecret.front);
      const decodeNewPassword = this.getHelper().aesDecrypt(newPassword, this.config.aesSecret.front);
      if (decodePassword === decodeOriginPassword) {
        // 旧密码不一致
        savePassword = this.getHelper().aesEncrypt(decodeNewPassword, this.config.aesSecret.admin);
      } else {
        return false;
      }
    }
    const obj: any = { name, nickName, email, phone, remark, headImg };
    if (savePassword) {
      await this.service.admin.sys.user.upgradePasswordV(uid);
      obj.password = savePassword;
    }
    await this.getRepo().admin.sys.User.update(uid, obj);
    return true;
  }

  /**
   * 增加系统用户，如果返回false则表示已存在该用户
   * @param param Object 对应SysUser实体类
   */
  async add(param: CreateUserDto) {
    // const insertData: any = { ...CreateUserDto };
    const exists = await this.getRepo().admin.sys.User.findOne({ username: param.username });
    if (!_.isEmpty(exists)) {
      return false;
    }
    // 所有用户初始密码为123456
    await this.ctx.ormManager.transaction(async manager => {
      const password = this.getHelper().aesEncrypt('123456', this.config.aesSecret.admin);
      const u = manager.create(this.getEntity().admin.sys.User, {
        departmentId: param.departmentId,
        username: param.username,
        password,
        name: param.name,
        nickName: param.nickName,
        email: param.email,
        phone: param.phone,
        remark: param.remark,
        status: param.status,
      });
      const result = await manager.save(u);
      const { roles } = param;
      const insertRoles = roles.map(e => {
        return {
          roleId: e,
          userId: result.id,
        };
      });
      // 分配角色
      await manager.insert(this.getEntity().admin.sys.UserRole, insertRoles);
    });
    return true;
  }

  /**
   * 更新用户信息
   */
  async update(param: UpdateUserDto) {
    await this.ctx.ormManager.transaction(async manager => {
      await manager.update(this.getEntity().admin.sys.User, param.id, {
        departmentId: param.departmentId,
        username: param.username,
        name: param.name,
        nickName: param.nickName,
        email: param.email,
        phone: param.phone,
        remark: param.remark,
        status: param.status,
      });
      // 先删除原来的角色关系
      await manager.delete(this.getEntity().admin.sys.UserRole, { userId: param.id });
      const insertRoles = param.roles.map(e => {
        return {
          roleId: e,
          userId: param.id,
        };
      });
      // 重新分配角色
      await manager.insert(this.getEntity().admin.sys.UserRole, insertRoles);
      if (param.status === 0) {
        // 禁用状态
        await this.forbidden(param.id);
      }
    });
  }

  /**
   * 查找用户信息
   * @param id 用户id
   */
  async info(id: number) {
    const user: any = await this.getRepo().admin.sys.User.findOne(id);
    if (_.isEmpty(user)) {
      throw new Error('unfind this user info');
    }
    const departmentRow = await this.getRepo().admin.sys.Department.findOne({ id: user!.departmentId });
    if (_.isEmpty(departmentRow)) {
      throw new Error('unfind this user info');
    }
    const roleRows = await this.getRepo().admin.sys.UserRole.find({ userId: user!.id });
    const roles = roleRows.map(e => {
      return e.roleId;
    });
    delete user!.password;
    return { ...user, roles, departmentName: departmentRow!.name };
  }

  /**
   * 查找列表里的信息
   */
  async infoList(ids: number[]) {
    const users = await this.getRepo().admin.sys.User.findByIds(ids);
    return users;
  }

  /**
   * 根据ID列表删除用户
   */
  async delete(userIds: number[]) {
    await this.getRepo().admin.sys.User.delete(userIds);
    await this.getRepo().admin.sys.UserRole.delete({ userId: In(userIds) });
  }

  /**
   * 根据部门ID列举用户条数：除去超级管理员
   */
  async count(uid: number, deptId: number) {
    if (deptId === -1) {
      return await this.getRepo().admin.sys.User.count({ id: Not(In([ this.config.rootRoleId, uid ])) });
    }
    return await this.getRepo().admin.sys.User.count({ id: Not(In([ this.config.rootRoleId, uid ])), departmentId: deptId });
  }

  /**
   * 根据部门ID进行分页查询用户列表
   * deptId = -1 时查询全部
   */
  async page(uid: number, deptId: number, page: number, count: number) {
    const result = await this.getRepo().admin.sys.User.createQueryBuilder('user')
      .innerJoinAndSelect('sys_department', 'dept', 'dept.id = user.departmentId')
      .where('user.id NOT IN (:...ids)', { ids: [ this.config.rootRoleId, uid ] })
      .andWhere(deptId === -1 ? '1 = 1' : `user.departmentId = '${deptId}'`)
      .offset(page * count)
      .limit(count)
      .getRawMany();
    const dealResult = result.map(e => {
      return {
        createTime: e.user_createTime,
        departmentId: e.user_department_id,
        email: e.user_email,
        headImg: e.user_head_img,
        id: e.user_id,
        name: e.user_name,
        nickName: e.user_nick_name,
        phone: e.user_phone,
        remark: e.user_remark,
        status: e.user_status,
        updateTime: e.user_updateTime,
        username: e.user_username,
        departmentName: e.dept_name,
      };
    });
    // const result = await this.getRepo().admin.sys.User.find({
    //   where: {
    //     username: Not('root'),
    //     departmentId: deptId,
    //   },
    //   order: {
    //     id: 'ASC',
    //   },
    //   take: count,
    //   skip: page * count,
    // });
    return dealResult;
  }

  /**
   * 禁用用户
   */
  async forbidden(uid: number) {
    await this.getAdminRedis().del(`admin:passwordVersion:${uid}`);
    await this.getAdminRedis().del(`admin:token:${uid}`);
    await this.getAdminRedis().del(`admin:perms:${uid}`);
  }

  /**
   * 禁用多个用户
   */
  async multiForbidden(uids: number[]) {
    if (uids) {
      const pvs: string[] = [];
      const ts: string[] = [];
      const ps: string[] = [];
      uids.forEach(e => {
        pvs.push(`admin:passwordVersion:${e}`);
        ts.push(`admin:token:${e}`);
        ps.push(`admin:perms:${e}`);
      });
      await this.getAdminRedis().del(pvs);
      await this.getAdminRedis().del(ts);
      await this.getAdminRedis().del(ps);
    }
  }

  /**
   * 升级用户版本密码
   */
  async upgradePasswordV(id: number) {
    // admin:passwordVersion:${param.id}
    const v = await this.getAdminRedis().get(`admin:passwordVersion:${id}`);
    if (!_.isEmpty(v)) {
      await this.getAdminRedis().set(`admin:passwordVersion:${id}`, parseInt(v!) + 1);
    }
  }

}
