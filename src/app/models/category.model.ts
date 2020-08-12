import { BaseModel } from './base.model';


export interface CategoryModel extends BaseModel{
  value: string;
  comment?: string;
  subCategories:SubCategoryModel[];
}

export interface SubCategoryModel extends BaseModel {
  value: string;
  comment?: string;
}
