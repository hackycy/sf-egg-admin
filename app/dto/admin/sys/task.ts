import {
  Length,
  IsString,
  IsIn,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  ValidateIf,
} from 'class-validator';
import { Expose, Type } from 'class-transformer';

export class CreateTaskDto {

  @Length(2, 50)
  @Expose()
  name: string;

  @IsString()
  @Expose()
  service: string;

  @IsIn([ 0, 1 ])
  @Expose()
  type: number;

  @IsIn([ 0, 1 ])
  @Expose()
  status: number;

  @ValidateIf(o => { return o.type === 0; })
  @IsDate()
  @Expose()
  @Type(() => Date)
  startTime: Date;

  @ValidateIf(o => { return o.type === 0; })
  @IsDate()
  @Expose()
  @Type(() => Date)
  endTime: Date;

  @IsInt()
  @IsOptional()
  @Expose()
  limit: number;

  @ValidateIf(o => { return o.type === 0; })
  @IsNotEmpty()
  @Expose()
  cron: string;

  @IsInt()
  @ValidateIf(o => { return o.type === 1; })
  @Expose()
  every: number;

  @IsOptional()
  @IsString()
  @Expose()
  data: string;

  @IsOptional()
  @IsString()
  @Expose()
  remark: string;

}

export class UpdateTaskDto extends CreateTaskDto {
  @IsInt()
  @Expose()
  id: number;
}

export class InfoTaskDto {
  @IsInt()
  @Expose()
  id: number;
}
