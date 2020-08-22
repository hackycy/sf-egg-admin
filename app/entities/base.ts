import { Column } from 'typeorm';

export default abstract class BaseEntity {
  @Column({ type: 'datetime', nullable: true })
  createTime: Date;

  @Column({ type: 'datetime', nullable: true })
  updateTime: Date;
}
