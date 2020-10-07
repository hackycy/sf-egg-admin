import {
  IsInt,
  IsOptional,
  IsNumberString,
  Min,
} from 'class-validator';
import { Expose } from 'class-transformer';

export class PagePostDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  @Expose()
  limit: number;

  @IsOptional()
  @IsInt()
  @Min(0)
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
  limit: string;

  @IsOptional()
  @IsNumberString()
  @Expose()
  page: string;
}
