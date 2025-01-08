import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <nav style={{padding:'10px',backgroundColor:'#f5f5f5'}}>
        <Link to="/">Home</Link>
        <Link to="/customer">Customer</Link>
        <Link to="/vendor">Vendor</Link>
        <Link to="/admin">Admin</Link>
    </nav>
  )
}

export default Navbar;
