import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OpFilterDto {
  @ApiProperty({
    type: String,
    description: 'Дата операции ОТ',
    example: new Date(),
    required: false,
  })
  @IsOptional()
  @IsString()
  operation_date_from: Date;

  @ApiProperty({
    type: String,
    description: 'Дата операции ДО',
    example: new Date(),
    required: false,
  })
  @IsOptional()
  @IsString()
  operation_date_to: Date;

  @ApiProperty({
    type: Number,
    description: 'ID работника',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  workerId: number;

  @ApiProperty({
    type: Number,
    description: 'ID квартиры',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  flatId: number;
}
