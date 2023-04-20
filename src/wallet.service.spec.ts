import { Test, TestingModule } from '@nestjs/testing';
import { WalletService } from './wallet.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Transaction } from './transaction.entity';

describe('WalletService', () => {
  let walletService: WalletService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [User, Transaction],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([User, Transaction]),
      ],
      providers: [WalletService],
    }).compile();

    walletService = module.get<WalletService>(WalletService);
  });

  it('should be defined', () => {
    expect(walletService).toBeDefined();
  });

  it('should create a user and get their balance', async () => {
    const user = new User();
    const savedUser = await walletService['userRepository'].save(user);

    const balance = await walletService.getBalance(savedUser.id);
    expect(balance).toEqual(0);
  });

  it('should add money to a user wallet', async () => {
    const user = new User();
    const savedUser = await walletService['userRepository'].save(user);

    const referenceId = await walletService.addMoney(savedUser.id, 1000);
    expect(referenceId).toBeDefined();

    const balance = await walletService.getBalance(savedUser.id);
    expect(balance).toEqual(1000);
  });

  it('should subtract money from a user wallet', async () => {
    const user = new User();
    const savedUser = await walletService['userRepository'].save(user);

    const referenceId = await walletService.addMoney(savedUser.id, -1000);
    expect(referenceId).toBeDefined();

    const balance = await walletService.getBalance(savedUser.id);
    expect(balance).toEqual(-1000);
  });

  it('should add and subtract money from a user wallet', async () => {
    const user = new User();
    const savedUser = await walletService['userRepository'].save(user);

    await walletService.addMoney(savedUser.id, 2000);
    await walletService.addMoney(savedUser.id, -1000);

    const balance = await walletService.getBalance(savedUser.id);
    expect(balance).toEqual(1000);
  });

  it('should throw an error when getting balance of a non-existent user', async () => {
    await expect(walletService.getBalance(-1)).rejects.toThrow(
      'User not found',
    );
  });

  it('should throw an error when adding money to a non-existent user', async () => {
    await expect(walletService.addMoney(-1, 1000)).rejects.toThrow(
      'User not found',
    );
  });
});
