import 'egg';

declare module 'egg' {
  interface Application {
    redis: any;
  }
}
