import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService){}

  @Get(':accountId')
  findAll(@Param('accountId') accountId: string) {
    return this.transactionsService.findAll(Number(accountId));
  }

  @Post()
  create(@Body() body: { accountId: number; amount: number; type: string; description?:string}) {
    return this.transactionsService.create(body.accountId, body.amount, body.type, body.description)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.transactionsService.delete(id);
  }
}
