import React,{useState,useEffect} from 'react'
import axios from 'axios';
import SearchBar from '../components/SearchBar';

const CustomerDashboard = () => {
    const [products,setProducts]=useState([]);

    useEffect(()=>{
        const fetchProducts=async()=>{
            try {
                const token=localStorage.getItem('token');

                if(!token){
                    setError('User not authenticated. Please log in.');
                    return;
                }

                const response=await axios.get('http://localhost:5000/products',{
                    headers:{
                        authorization:`Bearer ${token}`,
                    },
                });
                
                setProducts(response.data);
            } catch (error) {
                console.log('Error in fetching product ',error);
            }
        };

        fetchProducts();
    },[]);


  return (
    <div>
        <h1>Customer Dashboard</h1>
        <SearchBar setProducts={setProducts}></SearchBar>
        <div>
            {
                products.map((product)=>(
                    <div key={product.id} style={{border:'2px solid #ccc',padding:'10px',margin:'10px'}}>
                        <h2>{product.name}</h2>
                        <p>Price: Rs{product.price}</p>
                        <p>Stock: {product.stock}</p>
                        <button>Add to Cart</button>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default CustomerDashboard;
