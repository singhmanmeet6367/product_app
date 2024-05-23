import { AuthActionTypes } from "./auth.types"
import { TLogin, TRegister, TRegisterAPIResponse, TUser } from "./types"


export const registerUser = (name: string, email: string, password: string) => {
  return {
    type: AuthActionTypes.REGISTER_USER,
    payload: { name, email, password } as TRegister
  }
}

export const loginUser = (email: string, password: string) => {
  return {
    type: AuthActionTypes.LOGIN_USER,
    payload: { email, password } as TLogin
  }
}

export const setUser = (userData: TUser) => {
  return {
    type: AuthActionTypes.SET_USER,
    payload: userData
  }
}

export const logoutUser = () => {
  return {
    type: AuthActionTypes.LOGOUT_USER
  }
}
