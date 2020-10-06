import {
  IsInt,
  IsNumberString,
  ArrayNotEmpty,
} from 'class-validator';
import { Expose } from 'class-transformer';

export class DeleteDeptDto {

  @IsInt()
  @Expose()
  departmentId: number;
}

export class InfoDeptDto {

  @IsNumberString()
  @Expose()
  departmentId: string;
}

export class UpdateDeptDto {

}

export class TransferDeptDto {
  @ArrayNotEmpty()
  @Expose()
  userIds: number[];

  @IsInt()
  @Expose()
  departmentId: number;
}
