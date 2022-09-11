import dayjs from 'dayjs';
import { IPool } from 'app/shared/model/pool.model';
import { State } from 'app/shared/model/enumerations/state.model';

export interface IOrder {
  id?: number;
  ref?: string;
  sum?: number | null;
  date?: string | null;
  state?: State | null;
  pool?: IPool | null;
}

export const defaultValue: Readonly<IOrder> = {};
