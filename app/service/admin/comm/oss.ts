import BaseService from '../../base';
import * as qiniu from 'qiniu';
import * as path from 'path';
import * as moment from 'moment';
import ImageSpaceInfo from '../../../entities/admin/image/space/info';

/**
 * OSS Service
 */
export default class OssService extends BaseService {

  /**
   * 将文件上传至七牛
   */
  async upload(file: any, namespace: string) {
    const { bucket, accessKey, secretKey, zone } = this.config.qiniu;
    const key = `${namespace}/${moment().format('YYYYMMDD_hhmmss')}${path.extname(file.filename)}`;
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

  /**
   * 批量删除文件
   */
  async delete(images: ImageSpaceInfo[]) {
    const { bucket, accessKey, secretKey, zone } = this.config.qiniu;
    if (images && images.length > 0) {
      const keys = images.map(e => {
        const { key } = JSON.parse(e.extra);
        return qiniu.rs.deleteOp(bucket, key);
      });
      const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
      const qiniuConfig: any = new qiniu.conf.Config();
      qiniuConfig.zone = qiniu.zone[zone];
      const bucketManager = new qiniu.rs.BucketManager(mac, qiniuConfig);
      return new Promise((resolve, reject) => {
        bucketManager.batch(keys, (err, respBody, respInfo) => {
          if (err) {
            reject(err);
          } else {
            // 200 is success, 298 is part success
            if (parseInt(respInfo.statusCode) / 100 === 2) {
              resolve();
            } else {
              reject(respInfo.deleteusCode);
              console.log(respInfo.deleteusCode);
              console.log(respBody);
            }
          }
        });
      });
    }
  }

}
