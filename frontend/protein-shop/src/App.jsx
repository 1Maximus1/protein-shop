import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import SportNutrition from './components/sport-nutrition/SportNutrition';
import Vitamins from './components/sport-nutrition/Vitamins';
import Accessories from './components/accessories/Accessories';
import Contacts from './components/info/Contacts';
import About from './components/info/About';
import Delivery from './components/info/PaymentDelivery';
import Exchange from './components/info/Exchange';
import Terms from './components/info/Terms';
import Reviews from './components/info/Reviews';


import Login from './components/login/Login';
import Register from './components/register/Register';

import Account from './components/login/Account';
import Cart from './components/cart/Cart';
import Admin from './components/login/Admin';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sport-nutrition" element={<SportNutrition />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/vitamins" element={<Vitamins />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/about" element={<About />} />
        <Route path="/payment-delivery" element={<Delivery />} />
        <Route path="/exchange" element={<Exchange />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
