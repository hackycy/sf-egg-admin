import { Controller, Context } from 'egg';
import { Brackets } from 'typeorm';
interface ResOp {
    data?: any;
    isFail?: boolean;
    code?: number;
    message?: string;
}
interface PageOp {
    keyWordLikeFields?: string[];
    where?: Brackets;
    fieldEq?: string[];
    addOrderBy?: {};
}
/**
 * 控制器基类
 */
export declare abstract class BaseController extends Controller {
    protected entity: any;
    protected OpService: any;
    protected pageOption: PageOp | undefined;
    protected constructor(ctx: Context);
    /**
     * 初始化
     */
    protected init(): void;
    /**
     * 设置服务
     * @param service
     */
    protected setService(service: any): void;
    /**
     * 配置分页查询
     * @param option
     */
    protected setPageOption(option: PageOp): void;
    /**
     * 设置操作实体
     * @param entity
     */
    protected setEntity(entity: any): void;
    /**
     * 获得query请求参数
     */
    protected getQuery(): import("egg").PlainObject<string>;
    /**
     * 获得body请求参数
     */
    protected getBody(): any;
    /**
     * 分页查询数据
     */
    protected page(): Promise<void>;
    /**
     * 数据列表
     */
    protected list(): Promise<void>;
    /**
     * 信息
     */
    protected info(): Promise<void>;
    /**
     * 新增
     */
    protected add(): Promise<void>;
    /**
     * 修改
     */
    protected update(): Promise<void>;
    /**
     * 删除
     */
    protected delete(): Promise<void>;
    /**
     * 返回数据
     * @param op 返回配置，返回失败需要单独配置
     */
    protected res(op?: ResOp): void;
}
export {};
