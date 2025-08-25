import { Injectable } from '@nestjs/common';
import type { Client } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ClientsService {
  private prisma = new PrismaClient();


  async create(data: {name: string; cpf: string; phone: string}): Promise<Client> {
    const client = await this.prisma.client.create({data});


    await this.prisma.account.create({
      data: { client_id: client.id},
    })

    return client;
  }

  async findOne(id: string): Promise<Client | null> {
    return this.prisma.client.findUnique({ where: { id }, include: { account: true} });
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
    return this.prisma.client.findMany({
      include: {
        account: {
          select: {
            id: true,
            balance: true,
            created_at: true,
            updated_at: true,
          }
        }
      }
    })
  }
}
