import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user.entity';
import { Transaction } from './transaction.entity';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { DailySummaryTask } from './tasks/daily-summary.task';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'db',
      port: 3306,
      username: 'user',
      password: 'password',
      database: 'wallet',
      entities: [User, Transaction],
      synchronize: true,
    }),
  ],
  controllers: [AppController, WalletController],
  providers: [AppService, WalletService, DailySummaryTask],
})
export class AppModule {}
