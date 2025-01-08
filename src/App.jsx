import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import CustomerDashboard from './pages/CustomerDashboard';
import VendorDashboard from './pages/VendorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App=()=>{
  return (
    <Router>
      <Navbar></Navbar>

      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/customer" element={<CustomerDashboard></CustomerDashboard>}></Route>
        <Route path="/vendor" element={<VendorDashboard></VendorDashboard>}></Route>
        <Route path="/admin" element={<AdminDashboard></AdminDashboard>}></Route>
      </Routes>

      <Footer></Footer>
    </Router>
  );
};


export default App;