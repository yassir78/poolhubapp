import { Category } from './enumerations/category.model';
import { Color } from './enumerations/color.model';
import { Material } from './enumerations/material.model';
import { Shape } from './enumerations/shape.model';

export interface Pool {
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
  warranty?: number | null;
  nbStock?: number | null;
  shape?: Shape | null;
  material?: Material | null;
  color?: Color | null;
  category?: Category | null;
}

export const defaultValue: Readonly<Pool> = {
  active: false,
};
