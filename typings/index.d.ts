import 'egg';
import { LaunchOptions } from 'puppeteer';

interface Token {
  uid: number
  pv: number
}

declare module 'egg' {

  interface Context {
    token: Token
  }

  interface EggAppConfig {
    rootRoleId: number
    puppeteer: {
      launchOptions: LaunchOptions
    }
  }
}
