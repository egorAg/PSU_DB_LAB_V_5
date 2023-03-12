import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FlatDto {
  @ApiProperty({
    type: Number,
    description: 'ID квартиры',
    example: 123,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  intFlatId: number;

  @ApiProperty({
    type: Number,
    description: 'Полный адрес квартиры',
    example:
      'дом 1, ул. Пушкина, г. Москва, Россия, платена SOL-3, Солнечная система, галактический рукав Ориона, галактика Млечный Путь, Местная группа галактик, скопление Девы, сверхскопление Девы, сверхскопление Ланиакея, комплекс сверхскоплений (галактическая нить) Рыб-Кита.',
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  txtFlatAddress: string;

  @ApiProperty({
    type: Number,
    description: 'Площадь квартиры',
    example: 90.5,
    required: false,
  })
  @IsNotEmpty()
  @IsNumber()
  fltArea: number;

  @ApiProperty({
    type: Number,
    description: 'Количество жильцов квартиры',
    example: 50,
    required: false,
  })
  @IsNotEmpty()
  @IsNumber()
  intCount: number;

  @ApiProperty({
    type: Number,
    description: 'Этаж квартиры',
    example: 1,
    required: false,
  })
  @IsNotEmpty()
  @IsNumber()
  intStorey: number;

  @ApiProperty({
    type: Number,
    description: 'ID владельца квартиры',
    example: 123,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  ownerId?: number;
}
