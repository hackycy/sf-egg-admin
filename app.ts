/**
 * Application
 */

import { Application, IBoot, Context } from 'egg';
import * as moment from 'moment';

export default class AdminBoot implements IBoot {
  // private readonly app: Application;
  private readonly ctx: Context;

  constructor(app: Application) {
    // this.app = app;
    this.ctx = app.createAnonymousContext();
    // agent send
    app.messenger.on('init-task', () => {
      // 启动任务
      this.ctx.service.admin.sys.task.initTask();
    });
    // Date time
    // eslint-disable-next-line no-extend-native
    Date.prototype.toJSON = function() {
      return moment(this).format('YYYY-MM-DD HH:mm:ss');
    };
  }

  configWillLoad() {
    // Ready to call configDidLoad,
    // Config, plugin files are referred,
    // this is the last chance to modify the config.
  }

  configDidLoad() {
    // Config, plugin files have loaded.
  }

  async didLoad() {
    // All files have loaded, start plugin here.
  }

  async willReady() {
    // All plugins have started, can do some thing before app ready.
  }

  async didReady() {
    // Worker is ready, can do some things
    // don't need to block the app boot.
  }

  async serverDidReady() {
    // Server is listening.
  }

  async beforeClose() {
    // Do some thing before app close.
  }
}
