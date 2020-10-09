import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from '../base';

@Entity({ name: 'share_goods' })
export default class ShareGoods extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  cid: number;

  @Column({ type: 'varchar', length: 30 })
  title: string;

  @Column({ type: 'text', nullable: true })
  intro: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  tag: string;

  @Column({ type: 'int', nullable: true, default: 0 })
  ex_coin: number;

  @Column({ type: 'boolean', default: true, nullable: true })
  show: boolean;

  @Column({ type: 'tinyint', default: 1, nullable: true })
  status: number;

}
