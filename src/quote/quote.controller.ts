import {
  Controller,
  Post,
  Body,
  Get,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { QuoteService } from './quote.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { Response } from 'express';
import { AdminGuard } from '../common/guards/admin.guard';
import { JoiValidationPipe } from '../common/pipes/joi-validation-pipe';
import { CreateQuoteSchema } from './schemas/create-quote.schema';

@Controller('api')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Post('quote')
  @UsePipes(new JoiValidationPipe(CreateQuoteSchema))
  async create(@Body() dto: CreateQuoteDto) {
    return this.quoteService.createQuote(dto);
  }

  @UseGuards(AdminGuard)
  @Get('admin/quotes')
  async getQuotes() {
    return this.quoteService.getLast50Quotes();
  }

  @UseGuards(AdminGuard)
  @Get('admin/quotes/export')
  async export(@Res() res: Response) {
    const csv = await this.quoteService.exportCSV();
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=quotes.csv');
    res.send(csv);
  }
}
