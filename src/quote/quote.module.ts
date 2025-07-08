import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Quote } from './entities/quote.entity';
import { QuoteService } from './quote.service';
import { QuoteController } from './quote.controller';
import { CurrencyService } from '../utils/currency.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [SequelizeModule.forFeature([Quote]), ConfigModule],
  controllers: [QuoteController],
  providers: [QuoteService, CurrencyService],
})
export class QuoteModule {}
