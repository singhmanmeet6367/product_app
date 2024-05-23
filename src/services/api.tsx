import axios from "axios";
import { TRegister } from "../store/auth/types";
import { TCartAPIResponse } from "../store/cart/types";
import * as ErrorActionCreator from "../store/error/error.action";
import store from "../store/store"
const baseUrl = "http://localhost:3000"
const token = localStorage.getItem('token');
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};


export const checkAuthAndCallAPI = () => {
  let token = localStorage.getItem('token')
  debugger
  if (token !== null) {
    return true
  }
  else {
    let err = 'Token invalid'
    store.dispatch(ErrorActionCreator.setAPIError(err))
    return false
  }


}


export const getProductAPI = async (params?: { page?: number, size?: number }) => {
  try {
    const response = await axios.get(`${baseUrl}/products`, { params })
    store.dispatch(ErrorActionCreator.setAPIError(""))
    return response.data

  } catch (error: any) {
    let err = error?.response?.data?.message
    store.dispatch(ErrorActionCreator.setAPIError(err))
    return
  }
}


export const getProductDetails = async (productId: number) => {
  try {
    const response = await axios.get(`${baseUrl}/${productId}`)
    store.dispatch(ErrorActionCreator.setAPIError(""))
    return response.data

  } catch (error: any) {
    let err = error?.response?.data?.message
    store.dispatch(ErrorActionCreator.setAPIError(err))
    return
  }
}

export const addToCartAPI = async (id: number, quantity: number) => {
  try {
    let check = checkAuthAndCallAPI();
    if (!check) { return }
    debugger

    const response = await axios.post<TCartAPIResponse>(`${baseUrl}/cart`, { id, quantity }, config);
    store.dispatch(ErrorActionCreator.setAPIError(""))
    return response.data;

  } catch (error: any) {

    let err = error?.response?.data?.message
    store.dispatch(ErrorActionCreator.setAPIError(err))
    return

  }
};


export const registerUserAPI = async (name: string, email: string, password: string) => {
  try {
    const response = await axios.post(`${baseUrl}/auth/register`, { name, email, password });
    store.dispatch(ErrorActionCreator.setAPIError(""))
    return response.data;

  } catch (error: any) {

    let err = error?.response?.data?.message
    store.dispatch(ErrorActionCreator.setAPIError(err))
    return
  }
}

export const loginUserApi = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${baseUrl}/auth/login`, { email, password });
    store.dispatch(ErrorActionCreator.setAPIError(""))
    return response.data; // Assuming the response contains user data or a token

  } catch (error: any) {
    let err = error?.response?.data?.message
    store.dispatch(ErrorActionCreator.setAPIError(err))
    return
  }
};
