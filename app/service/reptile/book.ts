import BaseService from '../base';
import * as puppeteer from 'puppeteer-core';
import * as cheerio from 'cheerio';

/**
 * 小说爬虫Service
 */
export default class ReptileBookService extends BaseService {

  /**
   * 获取纵横书籍最新章节
   */
  async getZonghengBookLastchapter(param: any) {
    const browser = await puppeteer.launch({
      executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      ignoreHTTPSErrors: true,
    });
    const page = await browser.newPage();
    await page.goto(`http://book.zongheng.com/book/${param.id}.html`, { waitUntil: 'networkidle0' });
    const content = await page.content();
    const $ = cheerio.load(content);
    const chapter = $('.book-html-box .book-top .book-main .book-new-chapter .tit').text();
    const bookname = $('.book-html-box .book-top .book-main .book-info .book-name').text().trim();
    this.ctx.logger.info('[book-spider]', `${bookname} 最新章节 ： ${chapter}`);
    await this.service.admin.comm.email.sendEmail({
      from: 'noreply@mail.si-yee.com',
      text: `${bookname} 最新章节 ： ${chapter}`,
      to: (param.emails as string).split(','),
      subject: '小说最新章节',
      html: `<h2>${bookname} 最新章节 ： ${chapter}</h2>`,
    });
    await browser.close();
  }

}
