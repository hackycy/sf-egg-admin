import BaseService from '../../base';
import * as nodemailer from 'nodemailer';
import Mail = require('nodemailer/lib/mailer');

/**
 * 邮件服务
 */
export default class EmailService extends BaseService {

  /**
   * 发送邮件
   */
  async sendEmail(info: Mail.Options) {
    const { host, port, user, pass, secure } = this.config.mailer;
    // let testAccount = await nodemailer.createTestAccount();
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure, // true for 465, false for other ports
      auth: {
        user, // generated ethereal user
        pass, // generated ethereal password
      },
    });

    // send mail with defined transport object
    const result = await transporter.sendMail(info);
    return result;
  }

}
