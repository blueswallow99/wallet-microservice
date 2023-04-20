import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Transaction } from './transaction.entity';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  async getBalance(userId: number): Promise<number> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['transactions'],
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user.transactions.reduce(
      (balance, transaction) => balance + transaction.amount,
      0,
    );
  }

  async addMoney(userId: number, amount: number): Promise<number> {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new Error('User not found');
    }

    const transaction = this.transactionRepository.create({ userId, amount });
    await this.transactionRepository.save(transaction);

    return transaction.id;
  }
}
