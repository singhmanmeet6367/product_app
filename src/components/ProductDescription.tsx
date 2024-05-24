import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './ProductDescription.module.css';
import { IRootState } from '../store/store';
import * as CartActionCreator from '../store/cart/cart.action';
import * as ProductActionCreator from "../store/product/product.action";
import * as ErrorActionCreator from "../store/error/error.action";
import { IProduct } from '../store/product/types';

const ProductDescription = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { productID } = useParams(); // Get the product ID from the URL
  const product = useSelector<IRootState>((store) => store.product.selectedProduct) as IProduct
  console.log("product", product)
  const userID = localStorage.getItem("userID")
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    if (productID) {
      dispatch(ProductActionCreator.getProductDetails(parseInt(productID)))
    }
  }, [productID])


  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, quantity + delta);
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {

    if (userID === null) {
      return navigate("/auth")
    }
    else if (product.stock == 0 || quantity > product.stock) {
      dispatch(ErrorActionCreator.setAPIError(`${product.title} is out of stock or quantity exceed stock`))
    } else {
      dispatch(ErrorActionCreator.setAPIError(""))
      dispatch(CartActionCreator.addToCart(product.id, quantity))
      navigate("/cart")
    }
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className={styles.productDescription}>
      <div className={styles.imageContainer}>
        <img src={product.image} alt={product.title} />
      </div>
      <div className={styles.detailsContainer}>
        <h1>{product.title}</h1>
        <p className={styles.price}>${product.price.toFixed(2)}</p>
        <div className={styles.category}>Category: {product.category}</div>
        <div className={styles.stock}>
          {product.stock > 1 ? 'In Stock' : 'Out of Stock'}
        </div>
        <div className={styles.rating}>
          <span className={styles.ratingStars}>
            {'⭐'.repeat(Math.round(product.rating.rate))}
          </span>
          <span className={styles.ratingCount}>
            ({product.rating.count} reviews)
          </span>
        </div>
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
        </div>
        <button
          className={styles.addToCartButton}
          onClick={handleAddToCart}
          disabled={product.stock < 1}
        >
          Add to Cart
        </button>
        <div className={styles.description}>
          <h2>Description</h2>
          <p>{product.description}</p>
        </div>

      </div>
    </div>
  );
};

export default ProductDescription;
