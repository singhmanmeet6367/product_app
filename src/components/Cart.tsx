import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from "./ProductList.module.css";
import *as CartActionCreator from "../store/cart/cart.action";
import { IRootState } from '../store/store';
import { TCartItem } from '../store/cart/types';
import CartListItem from './CartListItem';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cartItems = useSelector<IRootState>((state) => state.cart.cartItems) as TCartItem[]
  const token = localStorage.getItem("token")
  useEffect(() => {
    if (token !== null) {

      dispatch(CartActionCreator.getCartItems())
    } else {
      navigate("/auth")
    }
  }, [])
  console.log("cartItem", cartItems)
  return (
    <div className={styles.listContainer}>
      {
        cartItems && cartItems.length > 0 ? <CartListItem /> : <h2> No Products in Cart</h2>
      }
    </div>
  )
}

export default Cart;  
