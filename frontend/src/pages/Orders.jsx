import React, { useCallback, useContext } from 'react'
import { ShopContext } from '../context/ShopContextValue'
import Title from '../components/Title';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const orderSteps = ['Order Placed', 'Packing', 'Shipped', 'Out for Delivery', 'Delivered']


const Orders = () => {
    
  const {currency,backendUrl,token}  = useContext(ShopContext);  

  const [orderData, setorderData] = useState([])  
  const [trackingOrder, setTrackingOrder] = useState('')

  const loadOrderData = useCallback(async ()  => {
     try {
       if(!token)  {
         return null
       }  
 const response  = await axios.post(backendUrl + '/api/order/userorders' , {} , {headers: {Authorization: `Bearer ${token}`}})
 if(response.data.success) {
   const allOrdersItem = []  
   response.data.orders.forEach((order)  => {
     order.items.forEach((item) => {
       allOrdersItem.push({
         ...item,
         orderId: order._id,
         status: order.status,
         payment: order.payment,
         paymentMethod: order.paymentMethod,
         date: order.date
       })
     })
   })  
   setorderData(allOrdersItem.reverse())
 }
     }  catch(error) {
       console.log(error)
     }
  }, [backendUrl, token])  

  const cancelOrder = async (orderId) => {
     try {
       const response = await axios.post(backendUrl + '/api/order/cancel', { orderId }, {headers: {Authorization: `Bearer ${token}`}})

       if(response.data.success) {
         toast.success('Order cancelled')
         await loadOrderData()
       } else {
         toast.error(response.data.message)
       }
     } catch(error) {
       console.log(error)
       toast.error(error.message)
     }
  }

  const toggleTracking = (orderId) => {
    setTrackingOrder((currentOrder) => currentOrder === orderId ? '' : orderId)
  }

  useEffect(()  => {
     loadOrderData()
  } , [loadOrderData])

  return (
    <div className='border-t pt-16'>
         <div className='text-2xl'>
          <Title text1={'MY'} text2={'ORDERS'}/>
         </div> 

         <div>  
          {
           orderData.map((item , index) => (
             <div key={`${item.orderId}-${item._id}-${index}`} className='py-4 border-t border-b text-gray-700 flex flex-col gap-4'>
                <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                    <div className='flex items-start gap-6 text-sm'>
                        <img className='w-16 sm:w-20 ' src={item.image[0]} alt="" />
                        <div>
                          <p className='sm:text-base font-medium'>{item.name}</p>
                          <div className='flex items-center gap-3 mt-1 text-base text-gray-700 '> 
                              <p>{currency}{item.price}</p>
                              <p>Quantity: {item.quantity}</p>
                              <p>Size: {item.size}</p>

                            </div>
                            <p className='mt-1'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                             <p className='mt-1'>Date: <span className='text-gray-400'>{item.paymentMethod}</span></p>
                          </div>
                     </div>
                     <div className='md:w-1/2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
                      <div className='flex items-center gap-2'>
                       <p className={`min-w-2 h-2 rounded-full ${item.status === 'Cancelled' ? 'bg-red-500' : 'bg-green-500'}`}></p>
                       <p className={`text-sm md:text-base ${item.status === 'Cancelled' ? 'text-red-600 font-medium' : ''}`}>{item.status}</p>
                        </div>
                        <div className='flex flex-wrap gap-2'>
                         {(item.status === 'Order Placed' || item.status === 'Packing') && (
                           <button onClick={() => cancelOrder(item.orderId)} className='border border-red-300 text-red-600 px-4 py-2 text-sm font-medium rounded-sm'>Cancel Order</button>
                         )}
                         {item.status === 'Cancelled' && (
                           <p className='px-4 py-2 text-sm font-medium text-red-600'>Cancelled</p>
                         )}
                         <button onClick={() => toggleTracking(item.orderId)} className='border px-4 py-2 text-sm font-medium rounded-sm '>Track Order</button>
                        </div>

                    </div>
                  </div>
                  {trackingOrder === item.orderId && (
                    <div className='md:pl-28'>
                      <div className='flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0'>
                        {orderSteps.map((step, stepIndex) => {
                          const completedIndex = orderSteps.indexOf(item.status)
                          const isComplete = completedIndex >= stepIndex

                          return (
                            <div key={step} className='flex sm:flex-1 items-center'>
                              <div className={`w-3 h-3 rounded-full ${isComplete ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                              <p className={`ml-2 text-xs sm:text-sm ${isComplete ? 'text-gray-800 font-medium' : 'text-gray-400'}`}>{step}</p>
                              {stepIndex < orderSteps.length - 1 && (
                                <div className={`hidden sm:block flex-1 h-px mx-3 ${isComplete && completedIndex > stepIndex ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
             </div>
           ))
          }

         </div>
    </div>
  )
}

export default Orders
