import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Transaction } from './transaction.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];
}
