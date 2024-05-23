import { ErrorActionType } from "./error.types";

export type TErrorState = {
  message: string
}
export type TErrorAction = {
  type: string,
  payload: string
}
const INITIAL_STATE: TErrorState = {
  message: ""
};

const errorReducer = (state = INITIAL_STATE, action: TErrorAction) => {
  switch (action.type) {
    case ErrorActionType.SET_ERROR:
      return {
        ...state,
        message: action.payload
      }

    default:
      return state;
  }
}


export default errorReducer

