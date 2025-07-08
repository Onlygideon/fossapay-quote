import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Quote extends Model {
  @Column inputAmount: number;
  @Column targetCurrency: string;
  @Column exchangeRate: number;
  @Column fee: number;
  @Column outputAmount: number;
  @Column timestamp: Date;
}
