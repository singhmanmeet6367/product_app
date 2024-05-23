import { ErrorActionType } from "./error.types"

export const setAPIError = (err: string) => {
  return {
    type: ErrorActionType.SET_ERROR,
    payload: err as string
  }
}
