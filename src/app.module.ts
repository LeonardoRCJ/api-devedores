import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { profile } from 'console';
import { ClientsModule } from './clients/clients.module';
import { AccountsModule } from './accounts/accounts.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [ClientsModule, AccountsModule, TransactionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
