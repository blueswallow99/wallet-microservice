import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get(':userId/balance')
  async getBalance(
    @Param('userId') userId: number,
  ): Promise<{ balance: number }> {
    const balance = await this.walletService.getBalance(userId);
    return { balance };
  }

  @Post('add-money')
  async addMoney(
    @Body('userId') userId: number,
    @Body('amount') amount: number,
  ): Promise<{ reference_id: number }> {
    const reference_id = await this.walletService.addMoney(userId, amount);
    return { reference_id };
  }
}
