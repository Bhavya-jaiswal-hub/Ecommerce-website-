import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {backendUrl} from '../App'
import {toast} from 'react-toastify'

const Orders = ({token}) => {  
  const [orders,setOrders]  = useState([])  

  const fetchAllOrders = async ()  => {
    
    if(!token) {
       return null;
    }  
    try {
  const response   = await axios.post(backendUrl + '/api/order/list', {}, {headers:{token}} ) 
     if(response.data.success) {
       setOrders(response.data.Orders)
     }  else {
       toast.error(response.data.message)
     }
    }  catch(error) {
         toast.error(error.message)
    }
    
   

  }  

  useEffect(() =>{
    fetchAllOrders();
  },[token])
  return (
    <div>
    <h3>Order page</h3> 
    <div>
      {
        orders.map((order,index) => {
           <div key = {index} >
              <img src={assets.parcel_icon} alt="" /> 
              <div> 
                {order.items.map(() =>{
                   
                })}
                </div>
            </div>
        })
      }
    </div>
    </div>
  )
}

export default Orders