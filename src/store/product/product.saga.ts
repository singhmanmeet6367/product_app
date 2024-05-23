import { ProductActionTypes } from "./product.types";
import { takeEvery, call, put } from 'redux-saga/effects'
import { getProductAPI } from "../../services/api";
import { APIResponseProduct } from "./types";
import * as ProductActionCreator from "./product.action"
function* getProductListSaga() {

  let params = {
    page: 1,
    size: 20
  }
  const res: APIResponseProduct = yield call(getProductAPI, params);
  if (res) {
    let productList = res?.resources
    yield put(ProductActionCreator.setProductList(productList))
  }

}


export function* productSagas() {

  // tajkeevery acts as listner to the call
  yield takeEvery(ProductActionTypes.GET_PRODUCTLIST, getProductListSaga);
}
