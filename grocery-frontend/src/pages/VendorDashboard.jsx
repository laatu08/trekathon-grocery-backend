import React,{useState,useEffect} from 'react'
import axios from 'axios';

const VendorDashboard = () => {
    const [products,setProducts]=useState([]);

    useEffect(()=>{
        const fetchProducts=async()=>{
            try {
                const token=localStorage.getItem('token');

                if(!token){
                    setError('User not authenticated. Please log in.');
                    return;
                }

                const response = await axios.get('http://localhost:5000/products/vendor',{
                    headers:{
                        authorization:`Bearer ${token}`,
                    },
                });
                setProducts(response.data);
            } catch (error) {
                console.log('Error fetching vendor product: ',error);
            }
        }

        fetchProducts();
    },[]);

    const updatePrice=async(id,newPrice)=>{
        try {
            await axios.put(`http://localhost:5000/products/${id}`,{price:newPrice});
            alert('Price Updated Successfully');
        } catch (error) {
            console.log('Error Updating Price: ',error);
        }
    }
  return (
    <div>
      <h1>Vendor Dashboard</h1>

      <div>
        {
            products.map((product)=>(
                <div key={product.id} style={{border:'2px solid #ccc',padding:'10px',margin:'10px'}}>
                    <h2>{product.name}</h2>
                    <p>Price: Rs{product.price}</p>
                    <button onClick={()=>{updatePrice(product.id,prompt('Enter new Price: '))}}>Update Price</button>
                </div>
            ))
        }
      </div>
    </div>
  )
}

export default VendorDashboard;
