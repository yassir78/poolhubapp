export type FilterParamsType = {
  forms: Array<string>;
  categories: Array<string>;
  priceMin: number;
  priceMax: number;
  volumeMin: number;
  volumeMax: number;
};
export type PaginationType = {
  empty?: number;
  first?: boolean;
  last?: false;
  number?: number;
  numberOfElements?: number;
  pageable?: {
    offset?: number;
    pageNumber?: number;
    pageSize?: number;
    paged?: boolean;
  };
  totalElements: number;
  totalPages: number;
};

export type PoolInitialState = {
  loading: boolean;
  isPoolSearch: boolean;
  errorMessage: string;
  poolSearch: PoolSearchType;
  list: PoolType[];
  entity: any;
  pagination: PaginationType;
  pool: PoolType;
};

export type PoolSearchType = {
  forms: Array<string>;
  categories: Array<string>;
  label: string;
  priceMin: number;
  priceMax: number;
  volumeMin: number;
  volumeMax: number;
};
export type PoolType = {
  label: string;
  brand: string;
  description: string;
  image: string;
  price: number;
  stock: number;
  active: boolean;
  volume: number;
  width: string;
  length: string;
  height: string;
  shape: string;
  material: string;
  color: string;
  category: string;
};
