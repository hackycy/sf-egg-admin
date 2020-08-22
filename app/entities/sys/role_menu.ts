import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import BaseEntity from '../base';

@Entity({ name: 'sys_role_menu' })
export default class SysRoleMenu extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint', name: 'role_id' })
  roleId: number;

  @Column({ type: 'bigint', name: 'menu_id' })
  menuId: number;
}
