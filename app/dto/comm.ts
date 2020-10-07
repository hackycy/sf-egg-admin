import {
  IsInt,
  IsOptional,
  IsNumberString,
} from 'class-validator';
import { Expose } from 'class-transformer';

export class PagePostDto {
  @IsOptional()
  @IsInt()
  @Expose()
  limit: number;

  @IsOptional()
  @IsInt()
  @Expose()
  page: number;
}

/**
 * 由于query获取的参数只能为string，所以要区分开
 */
export class PageGetDto {
  @IsOptional()
  @IsNumberString()
  @Expose()
  limit: number;

  @IsOptional()
  @IsNumberString()
  @Expose()
  page: number;
}
