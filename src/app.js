require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {Pool} = require('pg');


// App Initialization
const app=express();
app.use(cors());
app.use(express.json());


// Database Connection
const pool = new Pool({
    connectionString:process.env.DATABASE_URL,
})
pool.connect()
    .then(()=>{console.log('Connected to Database');})
    .catch(err=>{console.log(`Connection Error: ${err.stack}`);});


// Test Route
app.get('/',(req,res)=>{
    res.send("API is Running !");
})

const authRoutes=require('./routes/auth.js');
app.use('/auth',authRoutes);


// Start Server
const PORT=process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})


module.exports = {app,pool};
