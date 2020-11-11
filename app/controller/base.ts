import { Controller } from 'egg';
import { IHelper } from '../../typings/app';

export interface ResOp {
  data?: any;
  code?: number;
  message?: string;
}

export default abstract class BaseController extends Controller {

  /**
   * 获取Query
   */
  protected getQuery(): any {
    return this.ctx.request.query;
  }

  /**
   * 获取Body
   */
  protected getBody(): any {
    return this.ctx.request.body;
  }

  /**
   * 获取Router上的参数
   */
  protected getParams(): any {
    return this.ctx.params;
  }

  /**
   * 获取Helper
   */
  protected getHelper(): IHelper {
    return this.ctx.helper;
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
      message: op?.code ? this.ctx.helper.getErrorMessageByCode(`${op!.code}`) || op?.message || 'unknown error' : op?.message || 'success',
    };
  }

}
