import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom"; 
import './index.css';
// import App from './App';
import Products from './Products';
import Cart from './Cart';
import App from './App';
import AddProducts from './AddProducts';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  <BrowserRouter>
    <Routes>
      <Route exact path='/' element={< App />}></Route>  
      <Route exact path='/products' element={< Products />}></Route>  
      <Route exact path='/cart' element={< Cart />}></Route> 
      <Route exact path='/AddProducts' element={< AddProducts />}></Route> 
    </Routes>
  </BrowserRouter>   

</> 
);

