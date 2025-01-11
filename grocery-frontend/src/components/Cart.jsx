import react,{useEffect} from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const {cart,fetchCart,updateCartItem,deleteCartItem}=useCart();
    // const fetchCart=useCart();

    useEffect(()=>{
        fetchCart();
    },[]);


    const handleUpdateQuantity=(cartId,quantity)=>{
      if(quantity>0){
        updateCartItem(cartId,quantity);
      }
      else{
        alert('Quantity must be greater than 0');
      }
    }


    const handleDeleteItem=(cartId)=>{
      deleteCartItem(cartId);
    }

    const navigate = useNavigate();
    const handleCheckout = () => {
      navigate('/checkout');
    };

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.map((item)=>(
        <div key={item.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
            <h3>{item.name}</h3>
            <p>Price: Rs{item.price}</p>
            <p>Quantity:

              <input type="number" min="1" value={item.quantity} onChange={(e)=>handleUpdateQuantity(item.id,parseInt(e.target.value))} />

            </p>
            <button onClick={()=>handleDeleteItem(item.id)}>Remove Item</button>
        </div>
      ))}
      <button onClick={handleCheckout}>Proceed to Checkout</button>
    </div>
  )
}

export default Cart;
