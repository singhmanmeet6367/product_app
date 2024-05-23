import createSagaMiddleware from "@redux-saga/core";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";

import { composeWithDevTools } from "redux-devtools-extension";
import authReducer from "./auth/auth.reducer";
import { AuthSaga } from "./auth/auth.saga";
import { TUser } from "./auth/types";
import cartReducer from "./cart/cart.reducer";
import { CartSagas } from "./cart/cart.saga";
import { TCartItem } from "./cart/types";
import errorReducer from "./error/error.reducer";
import productReducer from "./product/product.reducer";
import { productSagas } from "./product/product.saga";
import { TProductList } from "./product/types";

export interface IRootState {
  product: {
    productList: TProductList,
    searchList: TProductList
  },
  cart: {
    count: number,
    cartItems: TCartItem[]
  },
  auth: {
    user: TUser
  },
  error: {
    message: string
  }
}


const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
  product: productReducer,
  cart: cartReducer,
  auth: authReducer,
  error: errorReducer
})
const middlewares = [sagaMiddleware];
const store = createStore(rootReducer, undefined, compose(applyMiddleware(...middlewares)))

sagaMiddleware.run(productSagas)
sagaMiddleware.run(CartSagas)
sagaMiddleware.run(AuthSaga)
export default store;
