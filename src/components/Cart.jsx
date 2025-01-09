import react,{useEffect} from 'react';
import { useCart } from '../context/CartContext';

const Cart = () => {
    const {cart,fetchCart}=useCart();
    // const fetchCart=useCart();

    useEffect(()=>{
        fetchCart();
    },[]);

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.map((item)=>(
        <div key={item.id}>
            <h3>{item.name}</h3>
            <p>Price: Rs{item.price}</p>
            <p>Quantity: {item.quantity}</p>
        </div>
      ))}
    </div>
  )
}

export default Cart;
