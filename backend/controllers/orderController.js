import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"

// Placing orders using Cash on delivery method 

const placeOrder = async (req,res)  => {
    try {
         const {userId, items, amount, address} = req.body  

         console.log("User ID from token:", userId);

         const orderData = {
             userId,
             items,
             address,
             amount,
             paymentMethod: "COD",
             payment: false,
             date: Date.now()
         }  

         const newOrder =  new orderModel(orderData)
         await newOrder.save()   

         await userModel.findByIdAndUpdate(userId, {cartData:{}}) 

         res.json({success:true, message: "Order placed"})
    } catch (error) {
         console.log(error)
         res.json({success:false, message:error.message})
    }
    

}   


// placing orders using Stripe Method 

const placeOrderStripe = async (req,res)  => {
     
}  


// placing orders using Razorpay Method 

const placeOrderRazorpay = async (req,res) => {
     
} 

// All orders data for admin panel

const allOrders = async (req,res)  => {
     
} 

// User Order Data for frontend 

const userOrders = async (req,res) => {
     
}   

// update order status  for admin panel 

const updateStatus = async (req,res) => {
     
}  

export {placeOrder , placeOrderStripe, placeOrderRazorpay,allOrders,userOrders,updateStatus}