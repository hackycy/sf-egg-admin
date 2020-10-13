import 'egg';

interface Token {
  uid: number
  pv: number
}

declare module 'egg' {

  interface Context {
    token: Token
  }

  interface Application {
    redis: any;
  }

  interface EggAppConfig {
    rootRoleId: number
    rootUserName: string
  }
}
