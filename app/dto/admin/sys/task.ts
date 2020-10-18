import {
  Length,
  IsString,
  IsIn,
  IsDate,
  IsInt,
  Validate,
  IsOptional,
  ValidateIf,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Expose, Type } from 'class-transformer';
import * as parser from 'cron-parser';

// cron 表达式验证，bull lib下引用了cron-parser
@ValidatorConstraint({ name: 'isCronExpression', async: false })
export class IsCronExpression implements ValidatorConstraintInterface {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(text: string, _args: ValidationArguments) {
    try {
      parser.parseExpression(text);
      return true;
    } catch (e) {
      return false;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(_args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return 'Text ($value) is must a cron expression!';
  }
}

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
  @Validate(IsCronExpression)
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
