import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import CustomerDashboard from './pages/CustomerDashboard';
import VendorDashboard from './pages/VendorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Cart from './components/Cart';
import CheckOut from './pages/CheckOut';

const App=()=>{
  return (
    <Router>
      <Navbar></Navbar>

      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>

        <Route path="/customer" element={<CustomerDashboard></CustomerDashboard>}></Route>
        <Route path="/vendor" element={<VendorDashboard></VendorDashboard>}></Route>
        <Route path="/admin" element={<AdminDashboard></AdminDashboard>}></Route>

        <Route path='/cart' element={<Cart></Cart>}></Route>
        <Route path='/checkout' element={<CheckOut></CheckOut>}></Route>
      </Routes>

      <Footer></Footer>
    </Router>
  );
};


export default App;