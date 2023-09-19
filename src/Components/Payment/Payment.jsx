import axios from 'axios';
import React, { useContext } from 'react'
import { cartContext } from '../Context/CartContext';
import LoadingScreen from '../loadingScreen/LoadingScreen';
import $ from 'jquery'
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Payment() {



const {cartId} = useContext(cartContext);


const nav = useNavigate();






    function confirmOrder() {

        document.querySelector('.confirm').style.display = 'none';
        document.querySelector('.MySpinner').style.display = 'block';


        document.querySelectorAll('.payMethod').forEach((ele) => {
            if(ele.checked) {
                ele.classList.add('checked');
            }
        })


        if(document.querySelector('.checked').value === 'Cash') {
            confirmCashOrder();
            setTimeout(() => {
                nav('/allorders');
            }, 2000);
        } else {
            confirmCreditOrder();
            setTimeout(() => {
                nav('/allorders');
            }, 3000);
        }
        
    }




    async function confirmCashOrder() {
        try {
            const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, {
                "shippingAddress":{
                    "details": document.querySelector('#address').value,
                    "phone": document.querySelector('#phone').value,
                    "city": document.querySelector('#city').value
                    }
            }, {
                headers: {
                    'token': localStorage.getItem('tkn')
                }
            } )

            if(data.status === 'success') {

                $('.successful').fadeIn(1000, function() {
                    setTimeout(() => {
                        $('.successful').fadeOut(1000);
                    }, 2000);
                    });
                
            } else {
                $('.wrong').fadeIn(1000, function() {
                    setTimeout(() => {
                        $('.wrong').fadeOut(1000);
                    }, 2000);
                    });
            }
            
        } catch(err) {
            // console.log(err);
            $('.wrong').fadeIn(1000, function() {
                setTimeout(() => {
                    $('.wrong').fadeOut(1000);
                }, 2000);
                });
        }
    }


    async function confirmCreditOrder() {
        try {
            const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`, {
                "shippingAddress":{
                    "details": document.querySelector('#address').value,
                    "phone": document.querySelector('#phone').value,
                    "city": document.querySelector('#city').value
                    }
            }, {
                headers: {'token': localStorage.getItem('tkn')},
                params: {'url' : 'http://localhost:3000'}
            } )

            if(data.status === 'success') {


                $('.successful').fadeIn(1000, function() {
                    setTimeout(() => {
                        $('.successful').fadeOut(1000);
                        window.open(data.session.url); 
                    }, 2000);
                    });
                
            } else {
                $('.wrong').fadeIn(1000, function() {
                    setTimeout(() => {
                        $('.wrong').fadeOut(1000);
                    }, 2000);
                    });
            }
            
        } catch(err) {
            // console.log(err);
            $('.wrong').fadeIn(1000, function() {
                setTimeout(() => {
                    $('.wrong').fadeOut(1000);
                }, 2000);
                });
        }
    }


    return <>

        <Helmet>    
                <title> Checkout Details </title>
        </Helmet>
    
    <div className="container position-relative">
    <div style={{'display': 'none', 'zIndex': '10000', 'width': 'fit-content' }}  className=" shadow mb-4 mx-3 successful rounded px-3 py-2 position-fixed bg-white bottom-0  start-0 text-center "> <i className="fa-solid fa-thumbs-up fa-bounce text-success"></i> order is submitted  </div> 
    <div style={{'display': 'none', 'zIndex': '10000', 'width': 'fit-content' }}  className=" shadow mb-4 mx-3 wrong rounded px-3 py-2 position-fixed bg-white bottom-0  start-0 text-center "> <i className="fa-solid fa-circle-xmark text-danger"></i> something wrong happened </div>   
        {cartId ?         <form className='w-50 m-auto  px-4 py-3 rounded shadow bg-white' > 
            <div className="head text-center p-1 bg-dark rounded">  
                <h4 className='text-white mt-1'> <i className="fa-solid fa-money-check"></i>  </h4>
            </div>

            <hr className='my-4 ' /> 
            <h5 className='fw-bold mb-3'> User Information </h5>

            <label className='mt-3 mb-1' htmlFor="name">  Full Name </label>
            <input className='form-control' type="text" name="name" id="name" />

            <label className='mt-3 mb-1' htmlFor="email">  Email </label>
            <input className='form-control' type="email" name="email" id="email" />

            <label className='mt-3 mb-1' htmlFor="phone">  Phone Number  </label>
            <input className='form-control' type="text" name="phone" id="phone" />

            <label className='mt-3 mb-1' htmlFor="city"> City </label>
            <input className='form-control' type="text" name="city" id="city" />

            <label className='mt-3 mb-1' htmlFor="address"> Address Details </label>
            <input className='form-control' type="text" name="city" id="address" />


            <div className="form-check mt-3">
                <input className="form-check-input payMethod " value="Cash" type="radio" name="flexRadioDefault" id="flexRadioDefault1" defaultChecked  />
                <label className="form-check-label"  htmlFor="flexRadioDefault1"> Cash</label>
            </div>
            <div className="form-check">
                <input className="form-check-input payMethod" value="Credit" type="radio" name="flexRadioDefault" id="flexRadioDefault2"  />
                <label className="form-check-label" htmlFor="flexRadioDefault2"> Credit </label>
            </div>

            <button type='button' onClick={confirmOrder} className='btn btn-primary w-100 mt-4' > <span className='confirm' > Confirm Order </span> <i  style={{'display': 'none'}} className={`fa-solid fa-spinner fa-spin MySpinner`}></i> </button>
        </form> : <LoadingScreen/>}



    </div>
    
    
    </>

}
