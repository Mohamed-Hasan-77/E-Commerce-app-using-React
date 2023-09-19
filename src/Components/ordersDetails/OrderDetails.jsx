import React from 'react'
import MainHeading from '../MainHeading/MainHeading'
import OrderSlider from './orderDetailsSlider';




export default function OrderDetails() {


    let myData = sessionStorage.getItem('orderData');
    const data = JSON.parse(myData);



    return  <>

            <MainHeading orderDetails = 'Orders Details ' />

            <div className="container">
            
                <div className="orders my-5 py-4 px-3 shadow bg-white">

                {data.map((order, idx ) => {
                    return <div key={idx} className="order my-2">
                            
                                <div className={`py-5 mb-5  shadow py-3 px-2 rounded `}>
                                <div className="head my-3">
                                    <h5 className='fw-bold' > Order Id : <span className='text-primary'> #{order.id} </span> </h5>
                                    <p className='text-secondary fw-bold' > Totla Price :  {order.totalOrderPrice} EGP  </p>
                                </div>
                                    <OrderSlider orderImages = {order.cartItems} />
                                </div>
                            </div>
                })}
                    

                </div>

            </div>
    </>

}
