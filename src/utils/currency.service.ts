import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CurrencyService {
  async fetchRate(toCurrency: string): Promise<number> {
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=${toCurrency.toLowerCase()}`,
    );

    return data.tether[toCurrency.toLowerCase()]
      ? data.tether[toCurrency.toLowerCase()]
      : 0;
  }

  getFeePercent(country: string): number {
    const feeMap = {
      NGN: 1.5,
      GHS: 2.0,
      ZAR: 1.8,
      ZMW: 1.8,
      KES: 2.0,
      UGX: 1.9,
      TZS: 2.1,
      RWF: 2.2,
      XOF: 2.0,
      XAF: 2.0,
      USD: 1.0,
      EUR: 1.3,
      GBP: 1.4,
    };

    return feeMap[country.toUpperCase()] ?? 2.5;
  }
}
