const dotenv=require('dotenv');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {Pool} = require('pg');

// const productRoutes=require('./routes/products.js');
// const authRoutes=require('./routes/auth.js');

dotenv.config();

// App Initialization
const app=express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Database Connection
const pool = new Pool({
    connectionString:process.env.DATABASE_URL,
});
pool.connect()
    .then(()=>{console.log('Connected to Database');})
    .catch(err=>{console.log(`Connection Error: ${err.stack}`);});


// Test Route
app.get('/',(req,res)=>{
    res.send("API is Running !");
})




// Start Server
const PORT=process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    console.log("Happing Coding");
})


module.exports = {pool};

const productRoutes=require('./routes/products.js');
const authRoutes=require('./routes/auth.js');

app.use('/auth',authRoutes);


app.use('/products',productRoutes);