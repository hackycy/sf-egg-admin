import BaseController from '../../base';
import { AdminRoute } from '../../../decorator/router_register';
import { CreateDeptDto, DeleteDeptDto, InfoDeptDto, UpdateDeptDto, TransferDeptDto } from '../../../dto/admin/sys/dept';

/**
 * 系统部门控制器
 */
export default class SysDeptController extends BaseController {

  @AdminRoute('/sys/dept/list', 'get')
  async list() {
    this.res(
      {
        data: await this.service.admin.sys.dept.getDepts(this.ctx.token.uid),
      },
    );
  }

  @AdminRoute('/sys/dept/add', 'post')
  async add() {
    const dto = await this.ctx.validate<CreateDeptDto>(CreateDeptDto);
    await this.service.admin.sys.dept.add(dto.departmentName, dto.parentDepartmentId);
    this.res();
  }

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

  @AdminRoute('/sys/dept/info', 'get')
  async info() {
    const q = await this.ctx.validate<InfoDeptDto>(InfoDeptDto, this.getQuery());
    this.res({
      data: await this.service.admin.sys.dept.info(parseInt(q.departmentId)),
    });
  }

  @AdminRoute('/sys/dept/update', 'post')
  async update() {
    const dto = await this.ctx.validate<UpdateDeptDto>(UpdateDeptDto);
    await this.service.admin.sys.dept.update(dto);
    this.res();
  }

  @AdminRoute('/sys/dept/transfer', 'post')
  async transfer() {
    const dto = await this.ctx.validate<TransferDeptDto>(TransferDeptDto);
    await this.service.admin.sys.dept.transfer(dto.userIds, dto.departmentId);
    this.res();
  }
}
