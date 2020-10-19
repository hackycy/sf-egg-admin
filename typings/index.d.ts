import 'egg';

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
  }
}
