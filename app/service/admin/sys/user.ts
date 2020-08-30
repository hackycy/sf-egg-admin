import * as _ from 'lodash';
import BaseService from '../../base';
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
    await this.getRepo().admin.sys.User.save(param);
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
   * 更新用户信息
   */
  async update(param: any) {
    // if (param.id && param.id === 1) {
    //   // root用户不支持修改
    //   throw new Error('root unsupport update');
    // }
    if (!_.isEmpty()) {
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
