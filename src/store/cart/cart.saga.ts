import { takeEvery, call, put } from 'redux-saga/effects'
import { addToCartAPI, deleteItemAPI, getCartItemsAPI, updateCartAPI } from '../../services/api';
import * as CartActionCreator from "./cart.action";
import { CartActionTypes } from './cart.types';
import { TAddToCart, TCartAPIResponse } from './types';

function* addToCartSaga(action: { type: string, payload: TAddToCart }) {
  let res: TCartAPIResponse = yield call(addToCartAPI, action.payload.id, action.payload.quantity)
  if (res) {
    yield put(CartActionCreator.setCartItems(res))
  }
}

function* getCartItemsSaga() {
  let res: TCartAPIResponse = yield call(getCartItemsAPI)
  if (res) {
    yield put(CartActionCreator.setCartItems(res))
  }
}

function* updateCartSaga(action: { type: string, payload: TAddToCart }) {
  let res: TCartAPIResponse = yield call(updateCartAPI, action.payload.id, action.payload.quantity)

  if (res) {
    yield put(CartActionCreator.setCartItems(res))
  }
}

function* deleteCartItemSaga(action: { type: string, payload: number }) {
  let res: TCartAPIResponse = yield call(deleteItemAPI, action.payload)
  debugger
  if (res) {
    yield put(CartActionCreator.setCartItems(res))
  }
}
export function* CartSagas() {
  yield takeEvery(CartActionTypes.ADD_TO_CART, addToCartSaga)
  yield takeEvery(CartActionTypes.GET_CART_ITEMS, getCartItemsSaga)
  yield takeEvery(CartActionTypes.UPDATE_CART, updateCartSaga)
  yield takeEvery(CartActionTypes.DELETE_CART_ITEM, deleteCartItemSaga)
}

