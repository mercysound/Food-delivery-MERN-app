import React, { useContext } from 'react'
import "./Verify.css"
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/FoodContext';
import { useEffect } from 'react';
import axios from 'axios';
const Verify = () => {
  const [searchParaams, setSearchParams] = useSearchParams();
  const success = searchParaams.get("success");
  const orderId = searchParaams.get("orderId");
  const {url} = useContext(StoreContext);
  const navigate = useNavigate()

  const verifyPayment = async () => {
    const response = await axios.post(url+"/api/order/verify", {success, orderId});
    if (response.data.success) {
      navigate("/myorders")
      console.log(response.data.success);
      
    }else{
      navigate("/")
    }
  }
  useEffect(()=>{
    verifyPayment()
  },[])
  return (
    <div className='verify'>
      <div className="spinner">

      </div>
    </div>
  )
}

export default Verify
