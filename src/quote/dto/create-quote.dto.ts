import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class CreateQuoteDto {
  @IsNumber()
  amount: number;

  @IsString()
  @IsNotEmpty()
  targetCurrency: string;
}
