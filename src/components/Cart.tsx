import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from "./ProductList.module.css";
import *as CartActionCreator from "../store/cart/cart.action";
import { IRootState } from '../store/store';
import { TCartItem } from '../store/cart/types';

const Cart = () => {
  const dispatch = useDispatch()
  const cartItems = useSelector<IRootState>((state) => state.cart.cartItems) as TCartItem[]

  useEffect(() => {
    dispatch(CartActionCreator.getCartItems())
  }, [])
  console.log("cartItem", cartItems)
  return (
    <div className={styles.listContainer}>
      cart
    </div>
  )
}

export default Cart;  
