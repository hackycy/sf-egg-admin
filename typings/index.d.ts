import 'egg';

declare module 'egg' {
  interface Application {
    // 处理egg-validator插件错误
    validator: any;
    redis: any;
  }
}
