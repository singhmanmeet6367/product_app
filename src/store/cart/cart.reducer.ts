import { CartActionTypes } from "./cart.types";
import { TCartAction, TCartStore } from "./types";


const INITIAL_STATE: TCartStore = {
  count: 0,
  cartItems: []
};

const cartReducer = (state = INITIAL_STATE, action: TCartAction) => {
  switch (action.type) {
    case CartActionTypes.SET_CART_ITEMS:
      return {
        ...state,
        cartItems: action.payload?.resources,
        count: action.payload?.count
      }

    default:
      return state;
  }
}


export default cartReducer

