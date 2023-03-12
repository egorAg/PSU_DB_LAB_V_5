import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('opt')
export class OptController {
  constructor() {}

  @Get()
  public async getAll(@Body() filter: any) {
    return filter;
  }

  @Get(':id')
  public async getById(@Param('id') id: number) {
    return id;
  }

  @Post()
  public async create(@Body() payload: any) {
    return payload;
  }

  @Patch(':id')
  public async update(@Param() id: number, @Body() payload: any) {
    return { id, payload };
  }

  @Delete(':id')
  public async delete(@Param('id') id: number) {
    return id;
  }
}
