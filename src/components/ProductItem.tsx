import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { IProduct } from '../store/product/types'
import styles from "./ProductItem.module.css";
import * as CartActionCreator from "../store/cart/cart.action"
import { TAddToCart } from '../store/cart/types';
type ProductItemProps = {
  key: number,
  product: IProduct
}

function ProductItem({ key, product }: ProductItemProps) {

  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, quantity + delta);
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    dispatch(CartActionCreator.addToCart(product.id, quantity))
  }
  return (
    <div className={styles.productItem}>
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
      <div>Category: {product.category}</div>
      <div>
        Stock: {product.stock > 1 ? product.stock : <span>out of Stock</span>}
      </div>
      <div className="productRating">
        <span className="ratingStars">
          {/* Use a loop or icon library to render stars based on rating.rate */}
        </span>
        <span className="ratingCount">({product.rating.count} reviews)</span>
      </div>
      {

      }
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
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>)
}

export default ProductItem
