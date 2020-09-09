import BaseService from '../../base';
import * as qiniu from 'qiniu';
import * as path from 'path';
import * as moment from 'moment';

/**
 * OSS Service
 */
export default class OssService extends BaseService {

  /**
   * 将文件上传至七牛
   */
  async upload(file: any) {
    const { bucket, accessKey, secretKey, zone } = this.config.qiniu;
    const key = `avatar/${moment().format('YYYYMMDD_hhmmss')}${path.extname(file.filename)}`;
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    const options = {
      scope: `${bucket}:${key}`,
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const qiniuConfig: any = new qiniu.conf.Config();
    qiniuConfig.zone = qiniu.zone[zone];
    const uploadToken = putPolicy.uploadToken(mac);
    return new Promise((resole, reject) => {
      const localFile = file.filepath;
      const formUploader = new qiniu.form_up.FormUploader(qiniuConfig);
      const putExtra = new qiniu.form_up.PutExtra();
      // 文件上传
      formUploader.putFile(uploadToken, key, localFile, putExtra, function(respErr,
        respBody, respInfo) {
        if (respErr) {
          reject(respErr);
        }
        if (respInfo.statusCode === 200) {
          resole(respBody);
        } else {
          reject(respErr);
        }
      });
    });
  }

}
