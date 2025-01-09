import React,{useState} from 'react'
import axios from 'axios';

const SearchBar = ({setProducts}) => {
    const [query,setQuery]=useState('');
    const [category,setCategory]=useState('');

    const handleSearch=async()=>{
        try {
            const token=localStorage.getItem('token');

            if(!token){
                setError('User not authenticated. Please log in.');
                return;
            }

            const response=await axios.get(`http://localhost:5000/products/search?name=${query}&category=${category}`,{
                    headers:{
                        authorization:`Bearer ${token}`,
                    },
                });
            
            console.log(response.data);
            setProducts(response.data);

        } 
        catch (error) {
            console.error('Error searching products:', error.message);
        }
    };

  return (
    <div>
      <input type="text" value={query} onChange={(e)=>{setQuery(e.target.value)}} placeholder='Search Products'/>

      <select value={category} onChange={(e)=>{setCategory(e.target.value)}} id="">
        <option value="">All Category</option>
        <option value="groceries">Groceries</option>
        <option value="vegetables">Vegetables</option>
        <option value="fruits">Fruits</option>
      </select>

      <button onClick={handleSearch}>Search</button>
    </div>
  )
}

export default SearchBar;
