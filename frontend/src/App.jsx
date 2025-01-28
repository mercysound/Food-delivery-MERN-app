import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import PlaceOrder from './pages/PlaceOrder/Placeorder'
import Cart from './pages/Cart/Cart'

const App = () => {
  return (
    <div className='app'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path='/order' element={<PlaceOrder/>}/>
      </Routes>
        {/* <Route path='/order' element={<PlaceOrder/>}/> */}
    </div>
  )
}

export default App