import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  amount: number;

  @ManyToOne(() => User, (user) => user.transactions)
  @JoinColumn({ name: 'userId' })
  user: User;
}
