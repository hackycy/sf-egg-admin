import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from '../base';

@Entity({ name: 'share_exchange' })
export default class ShareExchange extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  mid: string;

  @Column({ type: 'bigint' })
  gid: string;

  @Column({ type: 'int', unsigned: true })
  bcoin: number;

  @Column({ type: 'int', unsigned: true })
  acoin: number;

}
