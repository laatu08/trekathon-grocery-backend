import react ,{createContext,useState,useContext, Children} from 'react';
import axios from 'axios';

const CartContext=createContext();

export const useCart=()=>useContext(CartContext);

export const CartProvider=({children})=>{
    const [cart,setCart]=useState([]);

    const fetchCart=async()=>{
        try {
            const token=localStorage.getItem('token');
    
            if(!token){
                setError('User not authenticated. Please log in.');
                return;
            }
    
            const response=await axios.get('http://localhost:5000/cart',{
                headers:{
                    authorization:`Bearer ${token}`,
                },
            });

            // const data=await response.json();
            setCart(response.data);
        }
        catch (error) {
            console.error('Error fetching cart:', error);    
        }
    }

    const addToCart=async(product_id,quantity=1)=>{
        try {
            const token=localStorage.getItem('token');
    
            if(!token){
                setError('User not authenticated. Please log in.');
                return;
            }
    
            const response=await axios.post('http://localhost:5000/cart',{product_id,quantity},{
                headers:{
                    authorization:`Bearer ${token}`,
                },
            });

            // const newCartItem=await response.json();
            console.log(response.data);
            fetchCart();
        } 
        catch (error) {
            console.error('Error adding to cart:', error);
        }
    }


    return (
        <CartContext.Provider value={{cart,fetchCart,addToCart}}>
            {children}
        </CartContext.Provider>
    );
}