import { IOrder } from 'app/shared/model/order.model';
import { Shape } from 'app/shared/model/enumerations/shape.model';
import { Material } from 'app/shared/model/enumerations/material.model';
import { Color } from 'app/shared/model/enumerations/color.model';
import { Category } from 'app/shared/model/enumerations/category.model';

export interface IPool {
  id?: number;
  ref?: string;
  label?: string;
  brand?: string | null;
  description?: string | null;
  image?: string | null;
  price?: number | null;
  stock?: number | null;
  active?: boolean | null;
  volume?: number | null;
  width?: number | null;
  length?: number | null;
  height?: number | null;
  shape?: Shape | null;
  material?: Material | null;
  color?: Color | null;
  category?: Category | null;
  orders?: IOrder[] | null;
}

export const defaultValue: Readonly<IPool> = {
  active: false,
};
