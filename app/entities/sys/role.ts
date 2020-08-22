import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import BaseEntity from '../base';

@Entity({ name: 'sys_role' })
export default class SysRole extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  userId: string;

  @Column()
  name: string;

  @Column({ length: 50 })
  label: string;

  @Column({ nullable: true })
  remark: string;
}
