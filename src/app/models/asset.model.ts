import { BaseModel } from './base.model';

export interface Asset extends BaseModel {
  name: string;
  comment?: string;
  usage?: number;
}
