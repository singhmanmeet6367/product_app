import { takeEvery, call, put } from "redux-saga/effects";
import { loginUserApi, registerUserAPI } from "../../services/api";
import { AuthActionTypes } from "./auth.types";
import { TLogin, TRegister, TRegisterAPIResponse } from "./types";
import * as AuthActionCreator from "./auth.action";

function* registerUserSaga(action: { type: string, payload: TRegister }) {
  let res: TRegisterAPIResponse = yield call(registerUserAPI, action.payload.name, action.payload.email, action.payload.password);
}

function* loginUserSaga(action: { type: string, payload: TLogin }) {
  let res: TRegisterAPIResponse = yield call(loginUserApi, action.payload.email, action.payload.password)
  if (res) {
    localStorage.setItem('token', res.token);
    localStorage.setItem('refresh', res.refreshToken)
    let user = {
      name: res.name,
      email: res.email,
      id: res.id
    }
    yield put(AuthActionCreator.setUser(user))
  }
}

export function* AuthSaga() {
  yield takeEvery(AuthActionTypes.REGISTER_USER, registerUserSaga)
  yield takeEvery(AuthActionTypes.LOGIN_USER, loginUserSaga)
}
