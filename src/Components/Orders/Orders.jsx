import axios from 'axios';
import React, { useEffect, useState } from 'react'
import MainHeading from '../MainHeading/MainHeading';
import orderCss from './orders.module.css'
import LoadingScreen from './../loadingScreen/LoadingScreen';
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';
import $ from 'jquery'



export default function Orders({crrUser}) {

const orderHead = 'Track Orders'
const [orderInfo, setOrderInfo]= useState([]);

async function getUserOrders() {
        try {
            const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${crrUser.id}`);
            setOrderInfo(data);
            sessionStorage.setItem('orderData', JSON.stringify(data));
            
        } catch(err) {
            // console.log(err);
            $('.wrong').fadeIn(1000, function() {
                setTimeout(() => {
                    $('.wrong').fadeOut(1000);
                }, 2000);
                });
        }
}



useEffect(function() {
    getUserOrders()
    
} ,[]);

    return <>

        <Helmet>
                <title> Track Orders </title>
        </Helmet>
        
        <MainHeading orderHeading ={orderHead} />

        <div style={{'display': 'none', 'zIndex': '10000', 'width': 'fit-content' }}  className=" shadow mb-4 mx-3 wrong rounded px-3 py-2 position-fixed bg-white bottom-0  start-0 text-center "> <i className="fa-solid fa-circle-xmark text-danger"></i> something wrong happened </div>   
        {orderInfo.length == 0 ? <p className='text-secondary text-center fs-5'> No Orders Done Yet  </p> :         <div className="container py-3 px-4">

                                {orderInfo ? <>

                                <div className="orders shadow rounded py-2 px-3"> 

                                    <h4 className='fw-bold my-4' > User Name  : <span className='text-primary'> {orderInfo[0].user.name}  </span> </h4>

                                    <div className="row orderTracking"> 
                                        
                                        {orderInfo.map((pro, idx) => {
                                        return <div key={idx} className="col-md-6 col-lg-4 py-3">
                                        <div className="item shadow rounded py-4 px-3 bg-white">
                                            <h5 className='fw-bold w-100 bg-dark text-white text-center py-2 rounded' > Order Id : <span className='text-primary'> #{pro.id} </span> </h5>
                                            <div className={`${orderCss.orderDetails}  `}>
                                                <p className='fw-bold text-secondary mb-0  ' >   Items  Ordered : <span className='text-primary' > {pro.cartItems.length} </span>  </p>
                                                <p className='fw-bold text-secondary mb-0' >   Payment method : <span className='text-primary' > {pro.paymentMethodType} </span>  </p>
                                                <p className='fw-bold text-secondary mb-0' > Total order Price : <span className='text-primary' > {pro.totalOrderPrice} </span> </p>
                                                <p className='fw-bold text-secondary' > Phone : <span className='text-primary' > {pro.user.phone} </span> </p>
                                            </div>
                                            <div className="order py-2 px-3 d-flex align-items-center">
                                                <div className="trackCol">
                                                    <div className={`bg-primary ${orderCss.trackCircle}`}> <i class="fa-solid fa-check text-white fs-4"></i> </div>
                                                    <div className={`bg-primary ${orderCss.trackBar}`}></div>
                                                </div>
                                                <div className="info ms-2 d-flex text-primary">
                                                <i class="fa-solid fa-list-check me-2 fs-2 "></i> Order Processed
                                                </div>
                                            </div>
                                            <div className="order py-2 px-3 d-flex align-items-center">
                                                <div className="trackCol">
                                                    <div className={`bg-secondary ${orderCss.trackCircle}`}> </div>
                                                    <div className={`bg-secondary ${orderCss.trackBar}`}></div>
                                                </div>
                                                <div className="info ms-2 d-flex">
                                                <i class="fa-solid fa-cart-flatbed me-2 fs-2"></i> Order Shipped
                                                </div>
                                            </div>
                                            <div className="order py-2 px-3 d-flex align-items-center">
                                                <div className="trackCol">
                                                    <div className={`bg-secondary ${orderCss.trackCircle}`}> </div>
                                                    <div className={`bg-secondary ${orderCss.trackBar}`}></div>
                                                </div>
                                                <div className="info ms-2 d-flex">
                                                <i class="fa-solid fa-truck me-2 fs-2"></i>   On Route 
                                                </div>
                                            </div>
                                            <div className="order py-2 px-3 d-flex align-items-center">
                                                <div className="trackCol">
                                                    <div className={`bg-secondary ${orderCss.trackCircle}`}> </div>
                                                </div>
                                                <div className="info ms-2 d-flex ">
                                                <i class="fa-solid fa-house-chimney me-2 fs-2"></i> Order Arrived 
                                                </div>
                                            </div>
                                            <button className='btn btn-dark w-100 mt-4 ' > 
                                            <Link  className="text-decoration-none text-white" to='/OrderDetails'> More Info </Link>
                                            </button>
                                        </div>
                                    </div>

                                        } )}

                                </div>

                            </div>

                                </> : <LoadingScreen/> }
                                </div> }


    
    
    </>

}
