import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientNotFoundException } from 'src/exceptions/ClientNotFoundException';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(id);
  }

  @Post()
  create(@Body() body: { name: string; cpf: string; phone: string }) {
    return this.clientsService.create(body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.clientsService.delete(id);
  }

  @Get()
  async findAllWithBalance() {
    return this.clientsService.findAllWithBalance();
  }
}
