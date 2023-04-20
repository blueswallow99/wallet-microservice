import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user.entity';
import { Transaction } from './transaction.entity';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';

@Module({
  imports: [
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
  providers: [AppService, WalletService],
})
export class AppModule {}
