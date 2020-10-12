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
    const password = this.getHelper().aesEncrypt('123456', this.config.aesSecret.admin);
    const result = await this.getRepo().admin.sys.User.save({
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
    const { roles } = param;
    const insertRoles = roles.map(e => {
      return {
        roleId: e,
        userId: result.id,
      };
    });
    // 分配角色
    await this.getRepo().admin.sys.UserRole.insert(insertRoles);
    return true;
  }

  /**
   * 更新用户信息
   */
  async update(param: UpdateUserDto) {
    await this.getRepo().admin.sys.User.update(param.id, {
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
    await this.getRepo().admin.sys.UserRole.delete({ userId: param.id });
    const insertRoles = param.roles.map(e => {
      return {
        roleId: e,
        userId: param.id,
      };
    });
    // 重新分配角色
    await this.getRepo().admin.sys.UserRole.insert(insertRoles);
    if (param.status === 0) {
      // 禁用状态
      await this.forbidden(param.id);
    }
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
   * 根据ID列表删除用户
   */
  async delete(userIds: number[]) {
    await this.getRepo().admin.sys.User.delete(userIds);
    await this.getRepo().admin.sys.UserRole.delete({ userId: In(userIds) });
  }

  /**
   * 根据部门ID列举用户条数：除去超级管理员
   */
  async count(deptId: number) {
    const count = await this.getRepo().admin.sys.User.count({ username: Not(this.config.rootUserName), departmentId: deptId });
    return count;
  }

  /**
   * 根据部门ID进行分页查询用户列表
   * deptId = -1 时查询全部
   */
  async page(deptId: number, page: number, count: number) {
    const result = await this.getRepo().admin.sys.User.createQueryBuilder('user')
      .innerJoinAndSelect('sys_department', 'dept', 'dept.id = user.departmentId')
      .where(`user.username != '${this.config.rootUserName}'`)
      .andWhere(deptId === -1 ? '1 = 1' : `user.departmentId = '${deptId}'`)
      .skip(page * count)
      .take(count)
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
    await this.app.redis.get('admin').del(`admin:passwordVersion:${uid}`);
    await this.app.redis.get('admin').del(`admin:token:${uid}`);
    await this.app.redis.get('admin').del(`admin:perms:${uid}`);
  }

  /**
   * 升级用户版本密码
   */
  async upgradePasswordV(id: number) {
    // admin:passwordVersion:${param.id}
    const v = await this.app.redis.get('admin').get(`admin:passwordVersion:${id}`);
    if (!_.isEmpty(v)) {
      await this.app.redis.get('admin').set(`admin:passwordVersion:${id}`, parseInt(v) + 1);
    }
  }

}
