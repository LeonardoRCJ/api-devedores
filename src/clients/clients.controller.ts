import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientNotFoundException } from 'src/exceptions/ClientNotFoundException';
import type { Response } from 'express';
  
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(id);
  }

  @Post()
  async create(@Body() body: { name: string; cpf: string; phone: string }, @Res() res: Response) {

    const client = await this.clientsService.create(body);
    return res.status(HttpStatus.CREATED).send();
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.clientsService.delete(id);

    res.status(HttpStatus.NO_CONTENT).send();
  }

  @Get()
  async findAllWithBalance() {
    return this.clientsService.findAllWithBalance();
  }
}
