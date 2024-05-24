import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { IProduct } from '../store/product/types'
import styles from "./ProductItem.module.css";
import * as CartActionCreator from "../store/cart/cart.action"
import { TAddToCart } from '../store/cart/types';
import * as ErrorActionCreator from "../store/error/error.action"
import { useNavigate } from 'react-router-dom';
type ProductItemProps = {
  key: number,
  product: IProduct
}

function ProductItem({ key, product }: ProductItemProps) {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, quantity + delta);
    setQuantity(newQuantity);
  };

  const userID = localStorage.getItem("userID")
  const handleAddToCart = () => {

    if (userID === null) {
      return navigate("/auth")
    }
    else if (product.stock == 0 || quantity > product.stock) {
      dispatch(ErrorActionCreator.setAPIError(`${product.title} is out of stock or quantity exceed stock`))
    } else {
      dispatch(ErrorActionCreator.setAPIError(""))
      dispatch(CartActionCreator.addToCart(product.id, quantity))
    }
  }

  const handleProductDetail = () => {
    navigate(`/products/${product.id}`)
  }
  return (
    <div className={styles.productItem}>
      <img src={product.image} alt={product.title} onClick={handleProductDetail} />
      <h3 onClick={handleProductDetail}>{product.title}</h3>
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
      <div className={styles.quantityWrapper}>
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
        <button className={styles.addToCart} onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>)
}

export default ProductItem
