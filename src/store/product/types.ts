export interface IProductRating {
  rate: number;
  count: number;
}

export interface IProduct {
  id: number;
  title: string;
  price: number;
  description?: string; // Optional description
  stock: number;
  category: string;
  image: string;
  rating: IProductRating;
}

export type TProductList = IProduct[];

export type ProductAction = {
  type: string;
  payload?: any;
};

export interface IAppState {
  productList: IProduct[];
  searchList: IProduct[];
  selectedProduct?: IProduct
}

export type APIResponseProduct = {
  total: number;
  count: number;
  resources: IProduct[];
}
