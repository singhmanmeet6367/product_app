import { CartActionTypes } from "./cart.types"
import { TAddToCart, TCartAPIResponse } from "./types"

export const addToCart = (id: number, quantity: number) => {
  return {
    type: CartActionTypes.ADD_TO_CART,
    payload: { id, quantity } as TAddToCart
  }
}

export const setCartItems = (payload: TCartAPIResponse) => {
  return {
    type: CartActionTypes.SET_CART_ITEMS,
    payload
  }
}

export const getCartItems = () => {
  return {
    type: CartActionTypes.GET_CART_ITEMS
  }
}

export const updateCartItems = (id: number, quantity: number) => {
  return {
    type: CartActionTypes.UPDATE_CART,
    payload: { id, quantity } as TAddToCart
  }
}

export const deleteCartItems = (id: number) => {
  debugger
  return {
    type: CartActionTypes.DELETE_CART_ITEM,
    payload: id
  }
}
