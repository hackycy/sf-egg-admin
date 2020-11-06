import BaseService from '../base';

/**
 * 小说爬虫Service
 */
export default class ReptileBookService extends BaseService {

  /**
   * 获取纵横书籍最新章节
   */
  async getZonghengBookLastchapter(param: any) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const puppeteer = require('puppeteer-core');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const cheerio = require('cheerio');
    const browser = await puppeteer.launch(this.config.puppeteer.launchOptions);
    const page = await browser.newPage();
    await page.goto(`http://book.zongheng.com/book/${param.id}.html`, { waitUntil: 'networkidle0' });
    const content = await page.content();
    const $ = cheerio.load(content);
    const chapter = $('.book-html-box .book-top .book-main .book-new-chapter .tit').text();
    const bookname = $('.book-html-box .book-top .book-main .book-info .book-name').text().trim();
    await this.service.admin.comm.email.sendEmail({
      from: 'noreply@mail.si-yee.com',
      text: `${bookname} 最新章节 ： ${chapter}`,
      to: param.emails,
      subject: '小说最新章节',
      html: `<h2>${bookname} 最新章节 ： ${chapter}</h2>`,
    });
    await browser.close();
  }

}
