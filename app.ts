/**
 * Application
 */

import { Application, IBoot, Context } from 'egg';

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
