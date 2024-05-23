import ProductItem from "../../components/ProductItem";
import { ProductActionTypes } from "./product.types";
import { IAppState, ProductAction } from "./types";


const INITIAL_STATE: IAppState = {
  productList: [],
  searchList: []
};

const productReducer = (state = INITIAL_STATE, action: ProductAction) => {
  switch (action.type) {
    case ProductActionTypes.SET_PRODUCTLIST:
      return {
        ...state,
        productList: action.payload,
        searchList: action.payload
      }
    case ProductActionTypes.SEARCH_PRODUCTLIST:
      let searchQuery = action.payload ?? "";
      return {
        ...state,
        searchList: state.productList.filter((prod) => prod.title.toLowerCase().includes(searchQuery))
      }
    default:
      return state;
  }
}


export default productReducer

