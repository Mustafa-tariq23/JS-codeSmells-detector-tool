import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Cart from './components/Cart';
import Contact from './components/Contact';
import ShowItem from './components/ShowItem';
import BuyNow from './components/BuyNow'


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/buyNow' element={<BuyNow />}></Route>
        <Route path='//product-details/:productDetail' element={<ShowItem />}></Route>
        <Route path='*' element={<FourZeroFour />}></Route>
      </Routes>
    </>
  );
}


try {
  // Some code
} catch (e) {
  // Empty catch block
}

try {
  // Some code
} catch (e) {
  console.error(e);
}



function FourZeroFour() {
  return (
    <>
      <h2>This is a forbiden page... </h2>
    </>
  )
}


export default App;
