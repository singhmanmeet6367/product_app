import { ProductActionTypes } from "./product.types"
import { IProduct, TProductList } from "./types"


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

export const getProductDetails = (productID: number) => {
  return {
    type: ProductActionTypes.GET_PRODUCT_DETAILS,
    payload: productID
  }
}

export const setProductDetails = (details: IProduct) => {
  return {
    type: ProductActionTypes.SET_PRODUCT_DETAILS,
    payload: details
  }
}
