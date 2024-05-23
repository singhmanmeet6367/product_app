import ProductItem from "../../components/ProductItem";
import { ProductActionTypes } from "./product.types";
import { IAppState, ProductAction } from "./types";


const INITIAL_STATE: IAppState = {
  productList: [],
};

const productReducer = (state = INITIAL_STATE, action: ProductAction) => {
  switch (action.type) {
    case ProductActionTypes.SET_PRODUCTLIST:
      return {
        ...state,
        productList: action.payload
      }
    case ProductActionTypes.SEARCH_PRODUCTLIST:
      let searchQuery = action.payload ?? "";
      return {
        ...state,
        productList: state.productList.filter((prod) => prod.title.toLowerCase().includes(searchQuery))
      }
    default:
      return state;
  }
}


export default productReducer

