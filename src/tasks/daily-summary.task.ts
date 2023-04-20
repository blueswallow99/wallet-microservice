import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from '../transaction.entity';

@Injectable()
export class DailySummaryTask {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    const transactions = await this.transactionRepository.find();

    const totalAmount = transactions.reduce(
      (total, transaction) => total + transaction.amount,
      0,
    );

    console.log('Daily transaction summary:', {
      date: new Date().toISOString().slice(0, 10),
      totalAmount,
    });
  }
}
