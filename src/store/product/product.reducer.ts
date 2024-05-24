import ProductItem from "../../components/ProductItem";
import { ProductActionTypes } from "./product.types";
import { IAppState, ProductAction } from "./types";


const INITIAL_STATE: IAppState = {
  productList: [],
  searchList: [],
  selectedProduct: {
    id: -1,
    title: "",
    price: 0,
    description: "", // Optional description
    stock: 0,
    category: "",
    image: "",
    rating: {
      rate: 0,
      count: 0
    }
  }
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
    case ProductActionTypes.SET_PRODUCT_DETAILS:
      return {
        ...state,
        selectedProduct: action.payload
      }
    default:
      return state;
  }
}


export default productReducer

