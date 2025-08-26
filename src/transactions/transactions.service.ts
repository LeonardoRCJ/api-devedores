import { Injectable } from '@nestjs/common';
import { PrismaClient, Transaction } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { AccountNotFoundException } from 'src/exceptions/AccountNotFoundException';
import { TransactionNotFoundException } from 'src/exceptions/TransactionNotFoundException';

@Injectable()
export class TransactionsService {
  private prisma = new PrismaClient();

  async findAll(accoundId: number): Promise<Transaction[]> {
    return this.prisma.transaction.findMany({
      where: { account_id: accoundId },
      orderBy: { created_at: 'desc' },
    });
  }

  async create(
    accountId: number,
    amount: number,
    type: 'DEBIT' | 'CREDIT',
    description?: string,
  ): Promise<Transaction> {
    const account = await this.prisma.account.findUnique({
      where: { id: accountId },
    });
    if (!account) throw new AccountNotFoundException('Conta não encontrada');

    let newBalance = new Decimal(account.balance);

    if (type === 'DEBIT') {
      newBalance = newBalance.minus(amount);
    } else {
      newBalance = newBalance.plus(amount);
    }

    await this.prisma.account.update({
      where: { id: accountId },
      data: { balance: newBalance },
    });

    return this.prisma.transaction.create({
      data: { account_id: accountId, amount, type, description },
    });
  }

    async delete(id: string) {
      const transaction = await this.prisma.transaction.findUnique({
        where: { id },
        include: { account: true },
      });

      if (!transaction) {
        throw new TransactionNotFoundException('Transação não foi encontrada para deleção');
      }

      let newBalance = new Decimal(transaction.account.balance);

      if (transaction.type === 'DEBIT') {
        newBalance = newBalance.minus(transaction.amount);
      } else if (transaction.type === 'CREDIT') {
        newBalance = newBalance.plus(transaction.amount);
      }

      await this.prisma.account.update({
        where: { id: transaction.account.id },
        data: { balance: new Decimal(newBalance) },
      });

      return this.prisma.transaction.delete({
        where: { id },
      });
    }
  }
