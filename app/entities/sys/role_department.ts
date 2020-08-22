import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from '../base';

@Entity({ name: 'sys_role_department' })
export default class SysRoleDepartment extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint', name: 'role_id' })
  roleId: number;

  @Column({ type: 'bigint', name: 'department_id' })
  departmentId: number;
}
