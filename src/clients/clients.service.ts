import { Injectable } from '@nestjs/common';
import type { Client } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import { ClientNotFoundException } from 'src/exceptions/ClientNotFoundException';
import { json } from 'stream/consumers';

@Injectable()
export class ClientsService {
  private prisma = new PrismaClient();


  async create(data: {name: string; cpf: string; phone: string}): Promise<Client> {
    const client = await this.prisma.client.create({ data });


    await this.prisma.account.create({
      data: { client_id: client.id},
    })

    return client;
  }

  async findOne(id: string) {
    const client = await this.prisma.client.findUnique({ where: { id }, include: { account: true} });

    if (!client) {
      throw new ClientNotFoundException();
    }

    return client;
  }

  async delete(id: string) {
    const client = await this.prisma.client.findUnique({
      where: { id },
    })

    if (!client) {
      throw new Error('Client not found');
    }

    return this.prisma.client.delete({
      where: { id }
    })
  }

  

  async findAllWithBalance() {
  const clients = await this.prisma.client.findMany({
    include: {
      account: {
        select: {
          id: true,
          balance: true,
          created_at: true,
          updated_at: true,
        },
      },
    },
  });

  return clients.map(client => ({
    ...client,
    account: {
      ...client.account,
      balance: client.account!.balance.toNumber(), // 🔥 converte Decimal -> number
    },
  }));
}

}
