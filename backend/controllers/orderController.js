import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);



// placing user order from frontend
const placeOrder = async (req, res) => {
  // const front_url = "https://tomato-food-deliv-app-pi.vercel.app";
  const front_url = "http://localhost:5173";
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address
    })
    console.log(newOrder);
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} })
    // console.log(newOrder);
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "ngn",
        product_data: {
          name: item.name   
        },
        unit_amount: item.price * 100 
      },
      quantity: item.quantity
    }))

      line_items.push({
        price_data:{
          currency:"ngn",
          product_data:{
            name:"Delivey Charges"
          },
          unit_amount:2*100
        },
        quantity:1
      })

  const session = await stripe.checkout.sessions.create({
    line_items:line_items,
    mode: 'payment',
    success_url:`${front_url}/verify?success=true&orderId=${newOrder._id}`,
    cancel_url:`${front_url}/verify?success=false&orderId=${newOrder._id}`
  })
  console.log(session.url);
  
  res.json({success:true, session_url: session.url});
} catch (error) { 
  console.log(error);
  res.json({success:false, message:"Error"});
  // res.status(500).json({ success: false, message: error.message });
  }
  
}

const verifyOrder = async (req, res) => {
  const {orderId, success} = req.body;
  try {
    if (success=="true") { 
      console.log(success, orderId);
      await orderModel.findByIdAndUpdate(orderId, {payment:true})
      res.json({success:true, message:"Paid"})
    }else{
      await orderModel.findByIdAndDelete(orderId)
      res.json({success:false, message:"Not Paid"})
    }
  } catch (error) {
    console.log("Errors");
    res.json({success:false, message:"Error"})
    
  }
}
// User orders for frontend
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({userId:req.body.userId});
    res.json({success:true, data:orders})
  } catch (error) {
    console.log(error);
    res.json({success:false, message:"Error"})
    
  }
}
// Listing orders for admin Bannner
const listOrders = async (req, res)=>{
  try {
    const orders = await orderModel.find({});
    res.json({success:true, data:orders})
  } catch (error) {
    console.log(error);
    res.json({success:false, message:"Error"})
  }
}

// api for updating order status
const updateStatus = async (req, res) =>{
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
    res.json({success:true, message:"Status Updated"})
  } catch (error) {
    console.log(error);
    res.json({success:false, message:"Error"})
    
  }
}
export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus}









