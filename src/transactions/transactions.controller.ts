import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { json } from 'stream/consumers';
import type { Response } from 'express';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService){}

  @Get(':accountId')
  findAll(@Param('accountId') accountId: string) {
    return this.transactionsService.findAll(Number(accountId));
  }

  @Post()
  create(@Body() body: { accountId: number; amount: number; type: 'DEBIT' | 'CREDIT'; description?:string}) {
    return this.transactionsService.create(body.accountId, body.amount, body.type, body.description)
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.transactionsService.delete(id)
    
    res.status(HttpStatus.NO_CONTENT).send();
  }
}
