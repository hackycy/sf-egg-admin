import * as _ from 'lodash';
import BaseService from '../../base';
import { Not, In } from 'typeorm';

/**
 * 系统-用户
 */
export default class SysUserService extends BaseService {

  /**
   * 增加系统用户，如果返回false则表示已存在该用户
   * @param param Object 对应SysUser实体类
   */
  async add(param: any) {
    const exists = await this.getRepo().admin.sys.User.findOne({ username: param.username });
    if (!_.isEmpty(exists)) {
      return false;
    }
    const pwd = this.getHelper().generateRandomValue(8);
    param.password = this.getHelper().aesEncrypt(pwd, this.config.aesSecret.admin);
    const result = await this.getRepo().admin.sys.User.save(param);
    const { roles } = param;
    const insertRoles = roles.map(e => {
      return {
        roleId: e,
        userId: result.id,
      };
    });
    // 分配角色
    await this.getRepo().admin.sys.User_role.insert(insertRoles);
    // 发送初始密码邮件
    if (param.email) {
      try {
        await this.service.admin.comm.email.sendEmail({
          from: 'noreply@mail.si-yee.com', // sender address
          to: param.email, // list of receivers
          subject: '系统登录初始密码，请妥善保管', // Subject line
          text: `您的思忆后台账号：${param.username}的初始密码为${pwd}，请妥善保管好初始密码以登录系统`, // plain text body
        });
      } catch (e) {
        // send error will nothing to do
      }
    }
    return true;
  }

  /**
   * 查找用户信息
   * @param id 用户id
   */
  async info(id: number) {
    const user = await this.getRepo().admin.sys.User.findOne(id);
    if (!_.isEmpty(user)) {
      user!.password = this.getHelper().aesDecrypt(user!.password, this.config.aesSecret.admin);
    }
    return user;
  }

  /**
   * 根据ID列表删除用户
   */
  async delete(userIds: number[]) {
    await this.getRepo().admin.sys.User.delete(userIds);
    await this.getRepo().admin.sys.User_role.delete({ userId: In(userIds) });
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
        headImd: e.user_head_img,
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
   * 更新用户信息
   */
  async update(param: any) {
    // if (param.id && param.id === 1) {
    //   // root用户不支持修改
    //   throw new Error('root unsupport update');
    // }
    if (!_.isEmpty(param.password)) {
      param.password = this.getHelper().aesEncrypt(
        this.getHelper().aesDecrypt(param.password, this.config.aesSecret.front), this.config.aesSecret.admin);
      param.passwordV = param.passwordV + 1;
      await this.app.redis.get('admin').set(`admin:passwordVersion:${param.id}`, param.passwordV);
    } else {
      delete param.password;
    }
    if (param.status === 0) {
      // 禁用状态
      await this.forbidden(param.id);
    }
    await this.getRepo().admin.sys.User.save(param);
  }

  /**
   * 禁用用户
   */
  async forbidden(id: number) {
    await this.app.redis.get('admin').del(`admin:token:${id}`);
  }

}
