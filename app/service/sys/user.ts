import * as _ from 'lodash';
import BaseService from '../base';

/**
 * 系统-用户
 */
export default class SysUserService extends BaseService {

  /**
   * 增加系统用户，如果返回false则表示已存在该用户
   * @param param Object 对应SysUser实体类
   */
  async add(param: any) {
    const exists = await this.getRepo().sys.User.findOne({ username: param.username });
    if (!_.isEmpty(exists)) {
      return false;
    }
    const pwd = this.getHelper().generateRandomValue(8);
    param.password = this.getHelper().aesEncrypt(pwd);
    await this.getRepo().sys.User.save(param);
    return true;
  }

  /**
   * 查找用户信息
   * @param id 用户id
   */
  async info(id: number) {
    const user = await this.getRepo().sys.User.findOne(id);
    if (!_.isEmpty(user)) {
      user!.password = this.getHelper().aesDecrypt(user!.password);
    }
    return user;
  }

}
