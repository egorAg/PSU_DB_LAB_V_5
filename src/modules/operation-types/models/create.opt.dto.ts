import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOptDto {
  @ApiProperty({
    type: Number,
    example: 1000,
    description: 'Стоимость операции в ₽',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  fltOperationPrice: number;

  @ApiProperty({
    type: String,
    example: 'Ремонт азиаатского ебальника',
    description: 'Имя типа операци',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  txtOperationTypeName: string;
}
