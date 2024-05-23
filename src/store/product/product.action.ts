import { ProductActionTypes } from "./product.types"
import { TProductList } from "./types"


export const getProductList = () => {
  return {
    type: ProductActionTypes.GET_PRODUCTLIST
  }
}

export const setProductList = (list: TProductList) => {
  return {
    type: ProductActionTypes.SET_PRODUCTLIST,
    payload: list
  }
}

export const searchProductList = (search: string) => {
  return {
    type: ProductActionTypes.SEARCH_PRODUCTLIST,
    payload: search
  }
} 
