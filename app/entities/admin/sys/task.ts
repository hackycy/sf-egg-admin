import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from '../../base';

@Entity({ name: 'sys_task' })
export default class SysDepartment extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @Column()
  service: string;

  @Column({ type: 'tinyint', default: 0 })
  type: number;

  @Column({ type: 'tinyint', default: 1 })
  status: number;

  @Column({ name: 'start_time', type: 'datetime', nullable: true })
  startTime: Date;

  @Column({ name: 'end_time', type: 'datetime', nullable: true })
  endTime: Date;

  @Column({ type: 'int', nullable: true, default: 0 })
  limit: number;

  @Column({ nullable: true })
  cron: string;

  @Column({ type: 'int', nullable: true })
  every: number;

  @Column({ type: 'varchar', length: 500, nullable: true })
  data: string;

  @Column({ nullable: true })
  remark: string;

}
