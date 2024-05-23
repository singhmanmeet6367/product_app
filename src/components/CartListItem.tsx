import React, { useEffect, useState } from 'react'
import styles from "./ProductItem.module.css";
import { TCartItem } from '../store/cart/types';
import { useDispatch } from 'react-redux';
import *as CartActionCreator from "../store/cart/cart.action"

type TCartItemProps = {
  key: string;
  product: TCartItem;
}
function CartListItem({ key, product }: TCartItemProps) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      setQuantity(product.quantity)
    }
  }, [product])
  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, quantity + delta);
    // setQuantity(newQuantity);
    dispatch(CartActionCreator.updateCartItems(product?.id, newQuantity))
  };
  return (
    <div className={styles.productItem}>

      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
      <div className="quantityWrapper">
        <label htmlFor={`quantity-${product.id}`}>Quantity:</label>
        <button onClick={() => handleQuantityChange(-1)}>-</button>
        <input
          type="number"
          id={`quantity-${product.id}`}
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        />
        <button onClick={() => handleQuantityChange(1)}>+</button>
      </div>
    </div>
  )
}

export default CartListItem
