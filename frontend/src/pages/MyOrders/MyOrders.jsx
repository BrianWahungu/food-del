import React, { useContext, useState, useEffect } from 'react';
import './MyOrders.css';
import axios from 'axios';  // Make sure you import axios if you're using it

import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';

const MyOrders = () => {
  // Move hooks inside the component
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    if (!token) return; // Ensure the token is available before making the request

    try {
      const response = await axios.post(`${url}/api/order/userorders`, {}, { headers: { token } });
      setData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching orders", error); // Add error handling
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]); // Use token as dependency to refetch when it changes

  return (
    <div className='my-orders'>
      <h2>my orders</h2>
      <div className="container">
        {data.map((order,index)=>{
            return (
                <div key={index} className='my-orders-order'>
                    <img src={assets.parcel_icon} alt="" />
                    <p>{order.items.map((item,index)=>{
                        if (index === order.items.length-1) {
                            return item.name+" x "+item.quantity 
                        }
                        else{
                            return item.name+" x "+item.quantity+", "
                        }
                    })}</p>
                    <p>${order.amount}.00</p>
                    <p>items: {order.items.length}</p>
                    <p><span>&#x25cf;</span><b>{order.status}</b></p>
                    <button onClick={fetchOrders}>Track Order</button>
                </div>
            )
        })}
      </div>
    </div>
  );
}

export default MyOrders;
