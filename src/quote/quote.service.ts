import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Quote } from './entities/quote.entity';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { CurrencyService } from '../utils/currency.service';

@Injectable()
export class QuoteService {
  constructor(
    @InjectModel(Quote) private quoteModel: typeof Quote,
    private currencyService: CurrencyService,
  ) {}

  async createQuote(dto: CreateQuoteDto) {
    const { amount, targetCurrency } = dto;

    if (amount <= 0) throw new BadRequestException('Invalid Amount');

    const rate = await this.currencyService.fetchRate(targetCurrency);
    if (rate == 0) throw new BadRequestException('Invalid Currency Code');

    const feePercent = this.currencyService.getFeePercent(targetCurrency);
    const fee = (feePercent / 100) * amount * rate;
    const output = amount * rate - fee;

    await this.quoteModel.create({
      inputAmount: amount,
      targetCurrency,
      exchangeRate: rate,
      fee,
      outputAmount: output,
      timestamp: new Date(),
    });

    return {
      success: true,
      data: {
        inputAmount: amount,
        targetCurrency,
        exchangeRate: rate,
        fee,
        outputAmount: output,
      },
    };
  }

  async getLast50Quotes() {
    const data = await this.quoteModel.findAll({
      limit: 50,
      order: [['createdAt', 'DESC']],
    });

    return {
      success: true,
      data,
    };
  }

  async exportCSV() {
    const quotes = await this.getLast50Quotes();
    const createCsvWriter = require('csv-writer').createObjectCsvStringifier;

    const csvWriter = createCsvWriter({
      header: [
        { id: 'timestamp', title: 'Timestamp' },
        { id: 'inputAmount', title: 'USDT Amount' },
        { id: 'targetCurrency', title: 'Country' },
        { id: 'exchangeRate', title: 'Rate' },
        { id: 'fee', title: 'Fee' },
        { id: 'outputAmount', title: 'Fiat Output' },
      ],
    });

    return (
      csvWriter.getHeaderString() +
      csvWriter.stringifyRecords(quotes.data.map((q) => q.get({ plain: true })))
    );
  }
}
