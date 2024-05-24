import { AuthActionTypes } from "./auth.types";
import { TAuthState, TUser } from "./types";




const INITIAL_STATE: TAuthState = {
  user: {
    id: "",
    name: "",
    email: ""
  }
};

const authReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case AuthActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload
      }
    case AuthActionTypes.LOGOUT_USER:
      localStorage.removeItem("token")
      localStorage.removeItem("refresh")
      localStorage.removeItem("userID")
      return {
        ...state,
        user: {
          id: "",
          name: '',
          email: ''
        }
      }
    default:
      return state;
  }
}


export default authReducer

