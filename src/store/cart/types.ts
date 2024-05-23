export type TAddToCart = {
  id: number,
  quantity: number
}
export type TCartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export type TCartAPIResponse = {
  count: number;
  resources?: TCartItem[];
}


export type TCartStore = {
  count: number;
  cartItems?: TCartItem[];

}


export type TCartAction = {
  type: string;
  payload: TCartAPIResponse;
}
