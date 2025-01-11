import React,{useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [error,setError]=useState('');
    const navigate=useNavigate();


    const handleLogin=async(e)=>{
        e.preventDefault();

        try {
            const response=await axios.post('http://localhost:5000/auth/login',{
                email,
                password,
            });

            const {token}=response.data;

            if(token){
                // Save token in localstorage
                localStorage.setItem('token',token);

                // Redirect to customer dashboard
                navigate('/customer');
            }
            else{
                setError('Invalid credentials. Please try again.');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Login failed. Please check your credentials and try again.');
        }
    }

  return (
    <div style={{maxWidth:'400px',margin:'50px auto'}}>
      
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleLogin}>
        <div style={{marginBottom:'15px'}}>
            <label htmlFor="email">Email: </label>
            <input type="email" id='email' value={email} onChange={(e)=>setEmail(e.target.value)} style={{width:'100%',padding:'8px',marginTop:'5px'}} required />
        </div>

        <div style={{marginBottom:'15px'}}>
            <label htmlFor="password">Password: </label>
            <input type="password" id='password' value={password} onChange={(e)=>setPassword(e.target.value)} style={{width:'100%',padding:'8px',marginTop:'5px'}} required />
        </div>

    
        <button type='submit' style={{width:'100%',padding:'10px',backgroundColor:'#4CAF50', color:'#fff' ,border:'none',borderRadius:'5px'}}>Login</button>
        
      </form>
    </div>
  )
}

export default Login;
