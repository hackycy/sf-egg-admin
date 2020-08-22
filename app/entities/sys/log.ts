import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import BaseEntity from '../base';

@Entity({ name: 'sys_log' })
export default class SysLog extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ nullable: true })
  ip: string;

  @Column({ type: 'bigint', nullable: true, name: 'user_id' })
  userId: number;

  @Column({ nullable: true })
  params: string;

  @Column({ length: 100, nullable: true })
  action: string;
}
