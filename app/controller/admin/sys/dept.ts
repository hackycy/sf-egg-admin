import BaseController from '../../base';
import { AdminRoute } from '../../../decorator/router_register';
import { CreateDeptDto, DeleteDeptDto, InfoDeptDto, UpdateDeptDto, TransferDeptDto } from '../../../dto/admin/sys/dept';

/**
 * 系统部门控制器
 */
export default class SysDeptController extends BaseController {

  /**
   * @api {get} /admin/sys/dept/list 获取部门列表
   * @apiGroup 系统部门
   * @apiUse Auth
   * @apiUse BaseRes
   */
  @AdminRoute('/sys/dept/list', 'get')
  async list() {
    this.res(
      {
        data: await this.service.admin.sys.dept.getDepts(this.ctx.token.uid),
      },
    );
  }

  /**
   * @api {post} /admin/sys/dept/add 增加部门
   * @apiGroup 系统部门
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiParam {Number} parentDepartmentId 父级部门编号，没有则为-1
   * @apiParam {String} departmentName 部门名称
   */
  @AdminRoute('/sys/dept/add', 'post')
  async add() {
    const dto = await this.ctx.validate<CreateDeptDto>(CreateDeptDto);
    await this.service.admin.sys.dept.add(dto.departmentName, dto.parentDepartmentId);
    this.res();
  }

  /**
   * @api {post} /admin/sys/dept/delete 删除部门
   * @apiGroup 系统部门
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiParam {Number} departmentId 部门编号
   */
  @AdminRoute('/sys/dept/delete', 'post')
  async delete() {
    const dto = await this.ctx.validate<DeleteDeptDto>(DeleteDeptDto);
    // 查询是否有关联用户，如果含有则无法删除
    const count = await this.service.admin.sys.dept.countUserByDeptId(dto.departmentId);
    if (count > 0) {
      this.res({
        code: 10009,
      });
      return;
    }
    // 查询是否有关联的角色，角色与部门存在数据相互绑定
    const count2 = await this.service.admin.sys.dept.countRoleByDeptId(dto.departmentId);
    if (count2) {
      this.res({
        code: 10010,
      });
      return;
    }
    await this.service.admin.sys.dept.delete(dto.departmentId);
    this.res();
  }

  /**
   * @api {get} /admin/sys/dept/info 获取部门信息
   * @apiGroup 系统部门
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiParam {Number} departmentId 部门编号
   * @apiSuccess {SysDepartment} data 部门信息实体
   */
  @AdminRoute('/sys/dept/info', 'get')
  async info() {
    const q = await this.ctx.validate<InfoDeptDto>(InfoDeptDto, this.getQuery());
    this.res({
      data: await this.service.admin.sys.dept.info(parseInt(q.departmentId)),
    });
  }

  /**
   * @api {post} /admin/sys/dept/update 获取部门信息
   * @apiGroup 系统部门
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiParam {Number} id 部门编号
   * @apiParam {Number} parentId 父级部门编号，没有则为-1
   * @apiParam {String} name 部门名称
   * @apiParam {Number} orderNum 排序
   */
  @AdminRoute('/sys/dept/update', 'post')
  async update() {
    const dto = await this.ctx.validate<UpdateDeptDto>(UpdateDeptDto);
    await this.service.admin.sys.dept.update(dto);
    this.res();
  }

  /**
   * @api {post} /admin/sys/dept/transfer 人员部门转移
   * @apiGroup 系统部门
   * @apiUse Auth
   * @apiUse BaseRes
   * @apiParam {Number[]} userIds 管理员编号列表
   * @apiParam {Number} departmentId 需要转移去的部门编号
   */
  @AdminRoute('/sys/dept/transfer', 'post')
  async transfer() {
    const dto = await this.ctx.validate<TransferDeptDto>(TransferDeptDto);
    await this.service.admin.sys.dept.transfer(dto.userIds, dto.departmentId);
    this.res();
  }
}
