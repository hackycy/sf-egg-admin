import * as yaml from 'js-yaml';
import * as fs from 'fs';
import * as path from 'path';
import * as CryptoJS from 'crypto-js';
import { IHelper } from 'egg';
import { customAlphabet } from 'nanoid';

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
  aesEncrypt(this: IHelper, msg: string) {
    return CryptoJS.AES.encrypt(msg, this.config.aesSecret).toString();
  },

  /**
   * AES解密
   */
  aesDecrypt(this: IHelper, encrypted: string) {
    return CryptoJS.AES.decrypt(encrypted, this.config.aesSecret).toString(CryptoJS.enc.Utf8);
  },

  /**
   * 生成一个随机的值
   */
  generateRandomValue(length: number, placeholder = '1234567890qwertyuiopasdfghjklzxcvbnm') {
    const nanoid = customAlphabet(placeholder, length);
    return nanoid();
  },

};
