import { takeEvery, call, put } from 'redux-saga/effects'
import { addToCartAPI } from '../../services/api';
import * as CartActionCreator from "./cart.action";
import { CartActionTypes } from './cart.types';
import { TAddToCart, TCartAPIResponse } from './types';

function* addToCartSaga(action: { type: string, payload: TAddToCart }) {
  let res: TCartAPIResponse = yield call(addToCartAPI, action.payload.id, action.payload.quantity)
  if (res) {
    yield put(CartActionCreator.setCartItems(res))
  }
}


export function* CartSagas() {
  yield takeEvery(CartActionTypes.ADD_TO_CART, addToCartSaga)
}

