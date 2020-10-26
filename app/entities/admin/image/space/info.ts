import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from '../../../base';

@Entity({ name: 'image_space_info' })
export default class ImageSpaceInfo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'type_id' })
  typeId: number;

  @Column({ type: 'varchar', length: 500 })
  url: string;

  @Column()
  extra: string;

}
