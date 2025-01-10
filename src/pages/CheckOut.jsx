import React,{useEffect} from 'react'
import {useCart} from '../context/CartContext';
import axios from 'axios';


const CheckOut = () => {
    const {cart}=useCart();

    const totalAmount=cart.reduce((sum,item)=>sum+item.price*item.quantity,0);

    useEffect(()=>{
        // Render paypal button
        if(window.paypal){
            window.paypal.Buttons({
                createOrder:async(data,actions)=>{
                    const token=localStorage.getItem('token');

                    if(!token){
                        setError('User not authenticated. Please log in.');
                        return;
                    }
                    const response=await axios.post('http://localhost:5000/paypal/create-order',{totalAmount},{
                        headers:{
                            authorization:`Bearer ${token}`,
                        },
                    });

                    // const order=await response.json();
                    return response.data.id;
                },
                onApprove:async(data,actions)=>{
                    const token=localStorage.getItem('token');

                    if(!token){
                        setError('User not authenticated. Please log in.');
                        return;
                    }
                    const response=await axios.post('http://localhost:5000/paypal/capture-order',{orderId:data.orderID},{
                        headers:{
                            authorization:`Bearer ${token}`,
                        },
                    }); 

                    alert('Payment Successful');
                    console.log(response);
                },
                onError:(err)=>{
                    console.log('Payment Error: ',err);
                },
            }).render('#paypal-button-container')
        }
    },[totalAmount]);

  return (
    <div>
        <h2>Checkout</h2>
        {cart.map((item) => (
            <div key={item.id}>
                <h4>{item.name}</h4>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.price}</p>
            </div>
        ))}
        <h3>Total: ${totalAmount.toFixed(2)}</h3>
        <div id="paypal-button-container"></div>
    </div>
  )
}

export default CheckOut
