import React,{useState} from 'react'
import axios from 'axios';

const SearchBar = ({setProducts}) => {
    const [query,setQuery]=useState('');
    const [category,setCategory]=useState('');
    const [minPrice,setMinPrice]=useState('');
    const [maxPrice,setMaxPrice]=useState('');
    const [sortBy,setSortBy]=useState('');

    const handleSearch=async()=>{
        try {
            const token=localStorage.getItem('token');

            if(!token){
                setError('User not authenticated. Please log in.');
                return;
            }

            const response=await axios.get(`http://localhost:5000/products/search?name=${query}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}&sortBy=${sortBy}`,{
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

      <input type="number" value={minPrice} onChange={(e)=>{setMinPrice(e.target.value)}} placeholder="Min Price" />

      <input type="number" value={maxPrice} onChange={(e)=>{setMaxPrice(e.target.value)}} placeholder="Max Price" />

      <select name="" value={sortBy} id="" onChange={(e)=>{setSortBy(e.target.value)}}>
        <option value="">Sort by</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
      </select>

      <button onClick={handleSearch}>Search</button>
    </div>
  )
}

export default SearchBar;
