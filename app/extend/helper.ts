import * as yaml from 'js-yaml';
import * as fs from 'fs';
import * as path from 'path';
import * as CryptoJS from 'crypto-js';
import { IHelper } from 'egg';
import { customAlphabet } from 'nanoid';
import * as moment from 'moment';
import * as jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

/**
 * 格式化时间
 */
export const now = function() {
  return moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
};

export default {

  /**
   * 根据code获取错误信息
   */
  getErrorMessageByCode(code: string) {
    const errorMap = yaml.safeLoad(fs.readFileSync(path.resolve(__dirname, '../../config/config.error.yaml'), 'utf8'));
    return errorMap[code];
  },

  /**
   * AES加密
   */
  aesEncrypt(this: IHelper, msg: string, secret: string) {
    return CryptoJS.AES.encrypt(msg, secret).toString();
  },

  /**
   * AES解密
   */
  aesDecrypt(this: IHelper, encrypted: string, secret: string) {
    return CryptoJS.AES.decrypt(encrypted, secret).toString(CryptoJS.enc.Utf8);
  },

  /**
   * md5加密
   */
  md5(msg: string) {
    return CryptoJS.MD5(msg).toString();
  },

  /**
   * 生成一个随机的值
   */
  generateRandomValue(length: number, placeholder = '1234567890qwertyuiopasdfghjklzxcvbnm') {
    const nanoid = customAlphabet(placeholder, length);
    return nanoid();
  },

  /**
   * 生成一个UUID
   */
  generateUUID() {
    return uuidv4();
  },

  /**
   * 获取当前时间
   */
  getDate() {
    return now();
  },

  /**
   * JsonWebToken Sign
   * https://github.com/auth0/node-jsonwebtoken
   */
  jwtSign(this: IHelper, sign: any, options?: any) {
    return jwt.sign(sign, this.config.jwt.secret, options);
  },

  /**
   * JsonWebToken Verify
   * https://github.com/auth0/node-jsonwebtoken
   */
  jwtVerify(this: IHelper, token: string, options?: any) {
    return jwt.verify(token, this.config.jwt.secret, options);
  },

};

