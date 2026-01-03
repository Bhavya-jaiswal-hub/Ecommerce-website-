import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchBar from './components/SearchBar'
import Verify from './pages/Verify'
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      {/* Navbar will be displayed on all pages */}
      <ToastContainer/>
      <Navbar /> 
      <SearchBar /> 
      <Routes>
        <Route path='/' element={<Home />} /> 
        <Route path='/collection' element={<Collection />} /> 
        <Route path='/about' element={<About />} /> 
        <Route path='/contact' element={<Contact />} /> 
        <Route path='/product/:productId' element={<Product />} /> 
       <Route
  path='/cart'
  element={
    <ProtectedRoute>
      <Cart />
    </ProtectedRoute>
  }
/>
        <Route path='/login' element={<Login />} /> 
        <Route
  path='/place-order'
  element={
    <ProtectedRoute>
      <PlaceOrder />
    </ProtectedRoute>
  }
/>
       <Route
  path='/orders'
  element={
    <ProtectedRoute>
      <Orders />
    </ProtectedRoute>
  }
/> 
        <Route path="/forgot-password" element={<ForgotPassword />} />
       <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route path='/verify' element={<Verify />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
