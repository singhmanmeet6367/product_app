import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'
import * as ProductActionCreator from "../store/product/product.action"
import { IProduct, TProductList } from '../store/product/types'
import { IRootState } from '../store/store'
import ProductItem from './ProductItem'
import styles from "./ProductList.module.css"

function ProductList() {
  const dispatch = useDispatch()
  const prodList = useSelector<IRootState>(state => state.product.productList) as TProductList
  const [currentPage, setCurrentPage] = useState(1);
  const [pSize, setPSize] = useState(10);
  const [validParams, setValidParams] = useState<boolean>(true);
  const { page, pageSize } = useParams<{ page?: string, pageSize?: string }>();
  // useEffect(() => {
  //   dispatch(ProductActionCreator.getProductList())
  // }, [])
  useEffect(() => {
    if (page && pageSize) {
      const pageNumber = parseInt(page!);
      const size = parseInt(pageSize!);
      if (!isNaN(pageNumber) && !isNaN(size) && pageNumber > 0 && size > 0) {
        setCurrentPage(pageNumber);
        setPSize(size)
        setValidParams(true);
      } else {
        setValidParams(false);
      }
    }
  }, [page, pSize]);
  if (!validParams) {
    return <Navigate to="/bad-request" />;
  }


  const indexOfLastProduct = currentPage * pSize;
  const indexOfFirstProduct = indexOfLastProduct - pSize;
  const currentProducts = prodList.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = Number(e.target.value);
    if (newSize > 0) {
      setPSize(newSize);
      setCurrentPage(1); // Reset to first page when changing page size
      setValidParams(true);
    } else {
      setValidParams(false)
    }
  };

  return (
    <div className={styles.listContainer}>
      {currentProducts?.length > 0 ? currentProducts.map((prod: IProduct) => <ProductItem key={prod.id} product={prod} />) : <h1>No Products found</h1>}
      <div>
        <div className={styles.pagination}>
          {Array.from(Array(Math.ceil(prodList.length / pSize)).keys()).map(page => (
            <button key={page + 1} onClick={() => handlePageChange(page + 1)}>{page + 1}</button>
          ))}
        </div>
        {currentProducts?.length > 0 && <div className={styles.pageSizeInput}>
          <label htmlFor="pageSize">Page Size:</label>
          <input
            type="number"
            id="pageSize"
            value={pSize}
            onChange={handlePageSizeChange}
            min="1"
            step="1"
          />
        </div>}
      </div>
    </div>
  )
}

export default ProductList
