import React from 'react'
import { useCart } from '../context/CartContext'

const ProductCard = ({product}) => {
    const {addToCart}=useCart();

  return (
    <div key={product.id} style={{border:'2px solid #ccc',padding:'10px',margin:'10px'}}>
        <h2>{product.name}</h2>
        <p>Price: Rs{product.price}</p>
        <p>Stock: {product.stock}</p>
        <button onClick={()=>{addToCart(product.id)}}>Add to Cart</button>
    </div>
    // <div className='product-cart'>
    //   <h3>{product.name}</h3>
    //   <p>Price: Rs{product.price}</p>
    //   <button onClick={()=>{addToCart(product.id)}}>Add to Cart</button>
    // </div>
  )
}

export default ProductCard;
