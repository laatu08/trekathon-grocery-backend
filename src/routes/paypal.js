const express=require('express');
const router=express.Router();

const client=require('../utils/paypal');
const {pool}=require('../app');
const authenticateJWT=require('../middleware/auth');
const paypal=require('@paypal/checkout-server-sdk')

router.use(authenticateJWT);

// Create Paypal Order
router.post('/create-order',async(req,res)=>{
    const {totalAmount}=req.body;
    
    const request=new paypal.orders.OrdersCreateRequest();

    request.requestBody({
        intent:'CAPTURE',
        purchase_units:[
            {
                amount:{
                    currency_code:"USD",
                    value:totalAmount.toFixed(2),
                }
            }
        ]
    })

    try {
        const order=await client.execute(request);
        res.json({id:order.result.id});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})


// Capture paypal order
router.post('/capture-order',async(req,res)=>{
    const {orderId}=req.body;

    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});

    try {
        const capture = await client.execute(request);

        // Store order details in database
        const { id, status } = capture.result;
        const userId = req.user.id; // Assuming user ID is available via middleware
        const query = 'INSERT INTO orders (user_id, paypal_order_id, status) VALUES ($1, $2, $3)';
        await pool.query(query, [userId, id, status]);

        res.json({ message: 'Payment captured successfully', capture });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

module.exports=router;