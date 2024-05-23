import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ProductList from './components/ProductList';
import BadRequest from './components/BadRequest';
import Auth from './components/Auth';
import Cart from './components/Cart';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/products/1/10" />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/cart" element={<Cart />} />
          <Route path='/products/:page/:pageSize' element={<ProductList />} />
          <Route path="/bad-request" element={<BadRequest />} />
          {/* <Redirect to="/bad-request" /> */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
