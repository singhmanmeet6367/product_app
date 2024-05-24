import { ProductActionTypes } from "./product.types";
import { takeEvery, call, put, take } from 'redux-saga/effects'
import { getProductAPI, getProductDetailsAPI } from "../../services/api";
import { APIResponseProduct, IProduct } from "./types";
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

function* getProductDetailsSaga(action: { type: string, payload: number }) {
  const res: IProduct = yield call(getProductDetailsAPI, action.payload)
  if (res) {
    yield put(ProductActionCreator.setProductDetails(res))
  }
}


export function* productSagas() {

  // tajkeevery acts as listner to the call
  yield takeEvery(ProductActionTypes.GET_PRODUCTLIST, getProductListSaga);
  yield takeEvery(ProductActionTypes.GET_PRODUCT_DETAILS, getProductDetailsSaga);
}
