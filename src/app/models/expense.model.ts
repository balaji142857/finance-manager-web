import { BaseModel } from './base.model';

export interface TransactionModel extends BaseModel {

  asset: number;
  amount: number;
  transactionDate?: number;
  category?: number;
  subCategory?: number;
  comment?: string
  type: 'expense'|'income'

}
