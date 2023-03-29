import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class OptUpdateDto {
  @ApiProperty({
    type: Number,
    example: 1,
    description: `ID типа операции`,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({
    type: String,
    example: 'Ремонт крана',
    description: 'Имя типа операци',
    required: false,
  })
  @IsOptional()
  @IsString()
  txtOperationTypeName: string;

  @ApiProperty({
    type: Number,
    example: 1000,
    description: 'Стоимость операции в ₽',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  fltOperationPrice: number;
}
