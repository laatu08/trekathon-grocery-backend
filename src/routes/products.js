const express=require('express');
const authenticateJWT = require('../middleware/auth');
const {pool} = require('../app.js');


const router=express.Router();
console.log(authenticateJWT);
// console.log(authenticateJWT);

// MiddleWare to Authenticate JWT
router.use(authenticateJWT);


// Fetch all products 
router.get('/',async(req,res)=>{
    try {
        const result=await pool.query('select * from products');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})


// Add a Product
router.post('/',async(req,res)=>{
    const {name,price,stock,image_url}=req.body;
    const vendor_id=req.user.id;

    try {
        const result=await pool.query(
            'INsert into products (name,price,vendor_id,stock,image_url) values ($1,$2,$3,$4,$5) returning id',[name,price,vendor_id,stock,image_url]
        );

        res.status(201).json({productId:result.rows[0].id});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})


// Update Product
router.put('/:id',async(req,res)=>{
    const {name,price,stock,image_url}=req.body;
    const vendor_id=req.user.id;
    const productId=req.params.id;

    try {
        const result=await pool.query(
            'update products set name=$1, price=$2,stock=$3,image_url=$4 where id=$5 and vendor_id=$6 returning id',[name,price,stock,image_url,productId,vendor_id]
        );

        if(result.rowCount===0){
            return res.status(404).json({ error: 'Product not found or not authorized' });
        }

        res.json({productId:result.rows[0].id});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})


module.exports = router;