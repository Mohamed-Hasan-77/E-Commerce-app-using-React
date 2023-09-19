
import React, { useContext, useEffect, useState } from 'react'
import LoadingScreen from '../loadingScreen/LoadingScreen';
import { cartContext } from '../Context/CartContext';
import $ from 'jquery'
import MainHeading from '../MainHeading/MainHeading';
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';




export default function Cart() {

const CartHeading = "Cart"

const {userCartPrice, userCartProducts, removeCartItem, updateProductCount, minusProductCount, getUserCart, userCartItems} =  useContext(cartContext);




async function addProudctIn(id, idx, proCount) {

  document.querySelector('.loadUpdate'+idx).style.display = 'none';
  document.querySelector('.spinnerUpdate'+idx).style.display = 'block';
  setTimeout(() => {
    document.querySelector('.loadUpdate'+idx).style.display = 'block';
    document.querySelector('.spinnerUpdate'+idx).style.display = 'none';

}, 2000);

  if(await updateProductCount(id, idx, proCount) == true ) {

    $('.successfulMsg').fadeIn(1000, function() {
      
      setTimeout(() => {
        $('.successfulMsg').fadeOut(1000);
      }, 500);
    });
  } else {

    $('.wrongMsg').fadeIn(1000, function() {
      
      setTimeout(() => {
        $('.wrongMsg').fadeOut(1000);
      }, 500);
    });

  }


  }


async function minusProudctIn(id, idx, proCount) {

  document.querySelector('.loadUpdate'+idx).style.display = 'none';
  document.querySelector('.spinnerUpdate'+idx).style.display = 'block';
  setTimeout(() => {
    document.querySelector('.loadUpdate'+idx).style.display = 'block';
    document.querySelector('.spinnerUpdate'+idx).style.display = 'none';

}, 2000);

  if(await minusProductCount(id, idx, proCount) == true ) {
    
    $('.successfulMsg').fadeIn(1000, function() {
      
      setTimeout(() => {
        $('.successfulMsg').fadeOut(1000);
      }, 500);
    });
  } else {
    $('.wrongMsg').fadeIn(1000, function() {
      
      setTimeout(() => {
        $('.wrongMsg').fadeOut(1000);
      }, 500);
    });
  }
  

}


async function removeItem(id, idx, proCount) {

  document.querySelector('.removeIcon'+id).classList.remove("fa-trash");
  document.querySelector('.removeIcon'+id).classList.add("fa-spinner", 'fa-spin');
  

  if(await removeCartItem(id, idx, proCount) == true ) {

    $('.successfulMsg').fadeIn(1000, function() {
      
      setTimeout(() => {
        $('.successfulMsg').fadeOut(1000);
      }, 500);
    });
  } else {
    $('.wrongMsg').fadeIn(1000, function() {
      
      setTimeout(() => {
        $('.wrongMsg').fadeOut(1000);
      }, 500);
    });
  }

}




useEffect(function() {


getUserCart()

console.log( );

},[])

  return <>


        <Helmet>
                <title> Cart </title>
        </Helmet>
      
      <div className="container py-5  mb-5 position-relative crtBox">
      

      <div className="head text-center">
              
              <MainHeading pageHome = {CartHeading} />
      </div>

          {userCartProducts ? <>
        <div style={{'display': 'none', 'zIndex': '10000', 'width': 'fit-content' }}  className=" shadow mb-4 mx-3 successfulMsg rounded px-3 py-2 position-fixed bg-white bottom-0  start-0 text-center "> <i className="fa-solid fa-thumbs-up fa-bounce text-success"></i> successful  </div>   
        <div style={{'display': 'none', 'zIndex': '10000', 'width': 'fit-content' }}  className=" shadow mb-4 mx-3 wrongMsg rounded px-3 py-2 position-fixed bg-white bottom-0  start-0 text-center "> <i className="fa-solid fa-thumbs-up fa-bounce text-success"></i> something wrong happened  </div>   

        <div className="row shadow">
          <div className="col-md-8 bg-white">
              <div className="head pt-4  w-100 d-flex flex-wrap justify-content-between ">
                  <h4 className='fw-bold'> Cart Items </h4>
                  <hr className='w-100 mt-0'></hr>
              </div>
      {userCartProducts.map((pro, idx) => <div key={idx} className="product position-relative d-flex justify-content-between border-bottom align-items-center bg-white p-3">
                      <div className="details d-flex ">

                        <div className="img rounded me-3 " style={{'width': '80px'}}>
                          <img className='w-100' src={pro.product.imageCover} alt="ProductImage" />
                        </div>

                        <div className=" d-flex flex-column align-items-start">
                          {pro.product.title? <h4> {pro.product.title.split(" ").slice(0, 2).join(" ")} </h4> : <h5> 
                              <span className="spinner-grow spinner-grow-sm me-2" aria-hidden="true"></span>
                              <span role="status">Loading...</span>
                            </h5>}
                          <p> {pro.price} EGP </p>
                          <button onClick={() => removeItem(pro.product.id, idx)} className={`btn btn-outline-danger btn-sm remove${pro.product.id}`}>
                              <span>  <i className={`fa-solid fa-trash removeIcon${pro.product.id}`}></i> </span> Remove 
                          </button>
                        </div>
                      </div>

                      <div className="d-flex justify-content-center align-items-center">
                          <button onClick={() => minusProudctIn(pro.product.id, idx, pro.count)}  className={`btn btn-danger btn-sm mx-1`}>-</button>
                          <div className='badge bg-secondary fs-6 my-0 ' > <p className={` loadUpdate${idx} my-1 `}> {pro.count}   </p> <i  style={{'display': 'none'}} className={`fa-solid fa-spinner fa-spin spinnerUpdate${idx}`}></i> </div>
                          <button onClick={() => addProudctIn(pro.product.id, idx, pro.count)}  className={`btn  btn-primary btn-sm mx-1 `}>+</button>
                      </div>

                      </div> )}  
      
          {/* <div div className="d-flex justify-content-between align-items-center">
              <div className="TotalPrice text-end p-3">   <p className='px-2 py-1 mb-0  bg-primary text-white fw-bold rounded' >Total Price : {userCartPrice} EGP </p>  </div>
              <Link to='/payment'>  <div className=" p3">   <span className='btn btn-primary px-2 py-1 fw-bold'> Complete Order </span>   </div> </Link> 
          </div> */}
      </div>

        <div className="col-md-4 py-4 bg-body-secondary">
        <div className="head  w-100 d-flex flex-wrap justify-content-between ">
            <h4 className='fw-bold'> Order Summary</h4>
        <hr className='w-100 mt-0'></hr>
        </div>
        <div className="count d-flex justify-content-between fw-bold">
            <p> Cart Items   </p>
            <p className='text-danger'> {userCartItems}  </p>
        </div>
        <div className="summary mt-5">

        <h6 className='fw-bold' > Shipping </h6>

        <div className="input-group ">
          <select className="form-select fs-6" id="inputGroupSelect01">
            <option value="western" defaultValue > Free | max 5 days    </option>
            <option value="costa"> DHL : 50 EGP   max 3 days   </option>
            <option value="Mo">  Aramex : 70 EGP  max 1 days    </option>
          </select>
        </div>  

        <h6 className='mt-5 fw-bold'> Promo Code  </h6>
        <input type="text" className='form-control' name="promo" id="promo" />
        <button className='btn btn-danger mt-3 px-3 '> Apply </button>
        </div>

        <hr className='w-100 mt-5'></hr>
        <div className="count d-flex justify-content-between">
            <p> Total Cost </p>
            <p className='text-danger fw-bold' >  {userCartPrice} EGP  </p>
        </div>

          {userCartProducts.length < 1 ? <button className='btn btn-primary w-100 mt-3 px-3 '> CHECKOUT </button> : <Link to='/payment'> <button className='btn btn-primary w-100 mt-3 px-3 '> CHECKOUT </button> </Link>}
        

        </div>


        </div>
      
      </>  : <LoadingScreen/>}


    </div>


      
{/* <div className="container cart2  shadow mt-5 border bg-white mt-5">

<div className="row justify-content-between">
  <div className="col-md-7 py-4">
    <div className="head w-100 d-flex flex-wrap justify-content-between text-secondary">
        <p className='ms-5'> Products </p>
        <p className='ms-5' > Quantity</p>
        <p > price </p>
        <p> Total </p>
      <hr className='w-100 mt-0'></hr>
    </div>

    <div className="head  w-100 d-flex flex-wrap justify-content-between align-items-center ">
        <div className=''> 
        <div className="details d-flex ">
              <div className="img  me-3 " style={{'width': '80px'}}>
                <img className='w-100' src={require('../../finalProject assets/images/assortment-citrus-fruits.png')} alt="ProductImage" />
              </div>
              <div className=" d-flex flex-column  justify-content-around">
                <h4> ball </h4> 
                <p> category </p>
                <button  className={`btn text-danger ps-0 btn-sm remove`}>
                    <span>  <i className={`fa-solid fa-trash removeIcon`}></i> </span> Remove 
                </button>
              </div>
              </div>
        </div>

        <div className=''> 
            <div style={{'width': '90px'}} className="d-flex justify-content-center align-items-center flex-wrap">
              <div   className={` fw-bold fs-3 mx-1`}> - </div>
              <div className=' border px-2 mx-1 fs-6 my-0 ' > <p className={` loadUpdate my-1 `}> 10   </p> <i  style={{'display': 'none'}} className={`fa-solid fa-spinner fa-spin spinnerUpdate`}></i> </div>
              <div   className={` fw-bold fs-3 mx-1`}> + </div>
            </div>
        </div>

        <p style={{'width': '50px'}} > 5000 EGP </p>
        <p style={{'width': '50px'}}> 700EGP </p>
    </div>

    <div className="head mt-4 w-100 d-flex flex-wrap justify-content-between align-items-center ">
        <div className=''> 
        <div className="details d-flex ">
              <div className="img  me-3 " style={{'width': '80px'}}>
                <img className='w-100' src={require('../../finalProject assets/images/assortment-citrus-fruits.png')} alt="ProductImage" />
              </div>
              <div className=" d-flex flex-column  justify-content-around">
                <h4> ball </h4> 
                <p> category </p>
                <button  className={`btn text-danger ps-0 btn-sm remove`}>
                    <span>  <i className={`fa-solid fa-trash removeIcon`}></i> </span> Remove 
                </button>
              </div>
              </div>
        </div>

        <div className=''> 
            <div style={{'width': '90px'}} className="d-flex justify-content-center align-items-center flex-wrap">
              <div   className={` fw-bold fs-3 mx-1`}> - </div>
              <div className=' border px-2 mx-1 fs-6 my-0 ' > <p className={` loadUpdate my-1 `}> 10   </p> <i  style={{'display': 'none'}} className={`fa-solid fa-spinner fa-spin spinnerUpdate`}></i> </div>
              <div   className={` fw-bold fs-3 mx-1`}> + </div>
            </div>
        </div>

        <p style={{'width': '50px'}} > 5000 EGP </p>
        <p style={{'width': '50px'}}> 700EGP </p>

    </div>

    <div className="head mt-4 w-100 d-flex flex-wrap justify-content-between align-items-center ">
        <div className=''> 
        <div className="details d-flex ">
              <div className="img  me-3 " style={{'width': '80px'}}>
                <img className='w-100' src={require('../../finalProject assets/images/assortment-citrus-fruits.png')} alt="ProductImage" />
              </div>
              <div className=" d-flex flex-column  justify-content-around">
                <h4> ball </h4> 
                <p> category </p>
                <button  className={`btn text-danger ps-0 btn-sm remove`}>
                    <span>  <i className={`fa-solid fa-trash removeIcon`}></i> </span> Remove 
                </button>
              </div>
              </div>
        </div>

        <div className=''> 
            <div style={{'width': '90px'}} className="d-flex justify-content-center align-items-center flex-wrap">
              <div   className={` fw-bold fs-3 mx-1`}> - </div>
              <div className=' border px-2 mx-1 fs-6 my-0 ' > <p className={` loadUpdate my-1 `}> 10   </p> <i  style={{'display': 'none'}} className={`fa-solid fa-spinner fa-spin spinnerUpdate`}></i> </div>
              <div   className={` fw-bold fs-3 mx-1`}> + </div>
            </div>
        </div>

        <p style={{'width': '50px'}} > 5000 EGP </p>
        <p style={{'width': '50px'}}> 700EGP </p>

    </div>

  </div>
  <div className="col-md-4 py-4 bg-body-tertiary">
      <div className="head  w-100 d-flex flex-wrap justify-content-between text-secondary">
              <h4 className='fw-bold'> Order Summary</h4>
          <hr className='w-100 mt-0'></hr>
          </div>
          <div className="count d-flex justify-content-between">
              <p> Items : 3 </p>
              <p> Price : 500 EGP  </p>
          </div>
          <div className="summary mt-5">

          <h6 > Shipping </h6>

          <div class="input-group ">
            <select class="form-select fs-6" id="inputGroupSelect01">
              <option value="western" selected > western : 20 EGP </option>
              <option value="costa"> costa : 20 EGP </option>
              <option value="Mo">  Mo : 20 EGP </option>
            </select>
          </div>  

          <h6 className='mt-5'> Promo Code  </h6>
          <input type="text" className='form-control' name="promo" id="promo" />
          <button className='btn btn-danger mt-3 px-3 '> Apply </button>
      </div>

      <hr className='w-100 mt-5'></hr>
      <div className="count d-flex justify-content-between">
              <p> Total Cost </p>
              <p>  500 EGP  </p>
          </div>

          <button className='btn btn-primary w-100 mt-3 px-3 '> CHECKOUT </button>

    </div>



</div>


</div> */}

  
  
  </>

}
