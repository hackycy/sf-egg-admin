import {
  IsInt,
  Min,
  Max,
  MinLength,
  IsString,
  IsBoolean,
  Allow,
  IsNumberString,
} from 'class-validator';
import { Expose } from 'class-transformer';

/**
 * 增加菜单
 */
export class CreateMenuDto {

  @IsInt({ always: true })
  @Min(0, { always: true })
  @Max(2, { always: true })
  @Expose()
  type: number;

  @IsInt({ always: true })
  @Expose()
  parentId: number;

  @MinLength(2, { always: true })
  @Expose()
  name: string;

  @IsInt({ always: true })
  @Min(0, { always: true })
  @Expose()
  orderNum: number;

  @IsString({
    groups: [ 'menu' ],
  })
  @Expose()
  router: string;

  @IsBoolean({ groups: [ 'menu' ] })
  @Expose()
  isShow: boolean;

  @IsBoolean({ groups: [ 'menu' ] })
  @Expose()
  keepalive: boolean;

  @IsString({ groups: [ 'menu' ] })
  @Expose()
  icon: string;

  @IsString({ groups: [ 'perm' ] })
  @Expose()
  perms: string;

  @Allow()
  @Expose()
  viewPath: string;
}

/**
 * 删除菜单
 */
export class DeleteMenuDto {
  @IsInt()
  @Expose()
  menuId: number;
}

/**
 * 查询菜单
 */
export class InfoMenuDto {
  @IsNumberString()
  @Expose()
  menuId: string;
}
