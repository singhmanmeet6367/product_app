import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import { IRootState } from '../store/store';
import Header from './Header';
//import { CartContext } from '../context/CartContext';  
import styles from './Layout.module.css'; // Import styles
import * as ProductActionCreator from "../store/product/product.action"
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { error } from 'console';
interface LayoutProps {
  children?: React.ReactNode; // Optional child elements (for potential future use)
}
function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [query, setQuery] = useState("");
  const dispatch = useDispatch()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }
  const errorStr = useSelector<IRootState>(state => state.error.message)
  useEffect(() => {
    if (query != "") {
      dispatch(ProductActionCreator.searchProductList(query))
    } else {
      dispatch(ProductActionCreator.getProductList())
    }
  }, [query])

  useEffect(() => {
    if (errorStr !== "") {
      toast.error(`${errorStr}`, {
        position: 'top-right'
      })
    }
  }, [errorStr])

  const isSearch = location.pathname.toLowerCase().includes('auth') || location.pathname.toLowerCase().includes("cart") ? false : true
  const cartCount = useSelector<IRootState>(state => state.cart.count) as number
  return (
    <div className={styles.layout}>
      <Header cartCount={cartCount} />
      <main className={styles.main}>
        {isSearch && <div className={styles.searchBar}>
          <input value={query} type="text" placeholder="Search..." onChange={(e) => handleChange(e)} />
        </div>}
        <Outlet />
        {children}
        <ToastContainer />
      </main>
    </div>
  );
};

export default Layout;
