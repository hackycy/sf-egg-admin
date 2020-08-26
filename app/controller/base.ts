import { Controller, PlainObject } from 'egg';

export interface ResOp {
  data?: any;
  code?: number;
  message?: string;
}

export default abstract class BaseController extends Controller {

  /**
   * 获取Query
   */
  protected getQuery(): PlainObject<string> {
    return this.ctx.request.query;
  }

  /**
   * 获取Body
   */
  protected getBody(): any {
    return this.ctx.request.body;
  }

  /**
   * 获取Helper
   */
  getHelper() {
    return this.ctx.helper;
  }

  /**
   * 获取Service
   */
  getService() {
    return this.service;
  }

  /**
   * 返回数据
   * @param op 返回配置，返回失败需要单独配置
  */
  protected res(op?: ResOp): void {
    this.ctx.set('Content-Type', 'application/json');
    this.ctx.body = {
      data: op?.data ?? null,
      code: op?.code ?? 200,
      message: op?.message ?? 'success',
    };
  }

}
