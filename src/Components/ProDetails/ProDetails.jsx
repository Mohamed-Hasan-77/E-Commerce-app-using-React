import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import LoadingScreen from "../loadingScreen/LoadingScreen";
import { Link, useParams } from "react-router-dom";
import ProSlider from "./ProSlider/ProSlider";
import { cartContext } from "../Context/CartContext";
import $ from 'jquery'
import { Helmet } from "react-helmet";


export default function ProDetails({crrUser}) {




  const {addProductToCart, } = useContext(cartContext);

  const {id} = useParams();
  const [productsDetail, setProductsDetail] = useState(null);


  async function getProductDetails() {
    
      try {
        const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}` );

      setProductsDetail(data.data);

      } catch(err) {
        console.log(err);
      }
  }


async function addMyProduct(id) {

  document.querySelector('.add').style.display = 'none';
  document.querySelector('.mySpinner').style.display = 'block';
  setTimeout(() => {
    document.querySelector('.add').style.display = 'inline';
    document.querySelector('.mySpinner').style.display = 'none';

}, 2000);

    if( await addProductToCart(id) == true ) {
    $('.successful').fadeIn(1000, function() {
    
    setTimeout(() => {
        $('.successful').fadeOut(1000);
    }, 2000);
    });
  
    } else {
  
      document.querySelector('.addToCart').innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
  
      setTimeout(() => {
      document.getElementsByClassName('addToCart')[0].innerHTML = 'Add to Cart';
  
    }, 2000);
    $('.wrong').fadeIn(1000, function() {
  
    setTimeout(() => {
        $('.wrong').fadeOut(1000);
    }, 2000);
    });
  
  
    
    }
  
  
  }



  function wishlist( id) {

    document.querySelector('.favorite').classList.toggle("text-danger");
    document.querySelector('.favorite').classList.add("fa-bounce");
    if(document.querySelector('.favorite').classList.contains('text-danger')) {

      addToWishList(id);
      setTimeout(() => {
      document.querySelector('.favorite').classList.remove("fa-bounce");
      }, 1000)

    } else {
      reMoveFromWishList(id);
            setTimeout(() => {
      document.querySelector('.favorite').classList.remove("fa-bounce");
      }, 1000)

    }

  }


  async function reMoveFromWishList(id) {
            
    try {
        const {data} = await axios.delete(`https://route-ecommerce.onrender.com/api/v1/wishlist/${id}`, {
            headers: {'token' : localStorage.getItem('tkn')}
        });

    } catch(err) {
        console.log(err);
        $('.wrong').fadeIn(1000, function() {
  
          setTimeout(() => {
              $('.wrong').fadeOut(1000);
          }, 2000);
          });
    }
}

async function addToWishList(id) {
            
  try {
      const {data} = await axios.post(`https://route-ecommerce.onrender.com/api/v1/wishlist`, 
      {"productId": id},
      {headers: {'token' : localStorage.getItem('tkn')}});


  } catch(err) {
      console.log(err);
      $('.wrong').fadeIn(1000, function() {
  
        setTimeout(() => {
            $('.wrong').fadeOut(1000);
        }, 2000);
        });
  }
}




function logInFirst() {
  $('.loginOrSign').fadeIn(1000, function() {
    
    setTimeout(() => {
        $('.loginOrSign').fadeOut(1000);
    }, 2000);
    });
}


  useEffect(function() {
    getProductDetails();

  }, []);

  return <>
  {productsDetail ?     <div className="container p-4">

          <Helmet>
                  <title> {productsDetail.title} </title>
          </Helmet>


          <div style={{'position': 'fixed','left' : '0', 'bottom': '50px','zIndex': '100', 'backdropFilter': 'blur(2px)'}} className="d-flex p-1 rounded  align-items-center bg-danger shadow  border-bottom ">
                <Link className="text-decoration-none" to={'/home'}> <h6 className='me-2 ms-2 mt-2  fs-md-2 text-white' > <i class="fa-regular fa-hand-point-left "></i> Go Home </h6> </Link>
                {/* <h6 className='mt-2  text-secondary'> <i className="fa-solid fa-caret-right mt-1 ms-2 me-2 "></i> {proCard[0].brand.name}  </h6> */}
            </div>

      <div className="row  justify-content-around  ">

        <div className=" myImg   col-md-7 " style={{"height": '500px', 'overflow': 'hidden'}}>
          <ProSlider sliderImg={productsDetail.images} />
        </div>

        <div className=" col-md-5">

            <div className="head ">
                <h5 className="mt-4   fw-bold " >  {productsDetail.title.split(" ").slice(0, 2).join(" ")} </h5>
                {/* <div className="back d-none d-md-block" > <Link to={'/Home'} style={{"color": "black", "textDecoration": "none"}}> <i class="fa-solid fa-x  fs-4"></i> </Link> </div> */}
                <div className="pr_ra_wi d-flex justify-content-between my-4">            
                    <div className="price" >  <span className="fw-bold" > {productsDetail.price } EGP </span>  + Free Shipping</div>
                    <div className="rating d-flex align-items-center fs-6 fw-bold "> {productsDetail.ratingsAverage }  <i className="fa-solid fa-star text-warning ms-1"></i> </div>
                </div>
                
            <p className="my-3 " >  <span className="text-danger"> {productsDetail.category.name } </span> </p>
            </div>
            <p className="my-3 " > Brand :<span className="text-danger"> {productsDetail.brand.name } </span> </p>
            <div className="desc my-3 ">


                <p className="text-secondary">{productsDetail.description }</p>

                <div className="qu_add row  justify-content-between align-items-center">

                    {/* <div className="col-md-4"> 
                      <div class="input-group">
                        <select class="form-select fs-6" id="inputGroupSelect01">
                          <option  >Quantity...</option>
                          <option value="1" selected >1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                        </select>
                      </div>                   
                      </div> */}


                      {crrUser ? <>
                        <div className="col-12 mt-3 mt-md-0 position-relative"> 
                            <button onClick={() => addMyProduct(productsDetail.id)} className={`btn btn-primary addToCart w-100`}> <i  style={{'display': 'none'}} className={`fa-solid fa-spinner fa-spin mySpinner my-1`}></i> <span className="add" > Add to Cart </span> </button>
                            <div style={{'display': 'none', 'zIndex': '10000', 'width': 'fit-content' }}  className=" shadow mb-4 mx-3 successful rounded px-3 py-2 position-fixed bg-white bottom-0  start-0 text-center "> <i className="fa-solid fa-thumbs-up fa-bounce text-success"></i> Product Was Added to your cart  </div>   
                            <div style={{'display': 'none', 'zIndex': '10000', 'width': 'fit-content' }}  className=" shadow mb-4 mx-3 wrong rounded px-3 py-2 position-fixed bg-white bottom-0  start-0 text-center "> <i className="fa-solid fa-circle-xmark text-danger"></i> something wrong happened </div>   
                        </div>
                      
                      </> : <>
                      
                      <div className="col-12 mt-3 mt-md-0 position-relative"> 
                          <button onClick={() => logInFirst()} className={`btn btn-primary addToCart w-100`}> <i  style={{'display': 'none'}} className={`fa-solid fa-spinner fa-spin mySpinner my-1`}></i> <span className="add" > Add to Cart </span> </button>
                          <div style={{'display': 'none', 'zIndex': '10000', 'width': 'fit-content' }}  className=" shadow position-absolute  loginOrSign rounded px-3 py-2 w-100 bg-white top-100  start-0 text-center "> <i class="fa-regular fa-face-smile text-success"></i> Please Login or SignUp First </div>   
                      </div>
                      
                      
                      </>}
                      
                </div>

                <div className="d-flex">
                  <div className="w-100">
                    <p className=" text-secondary mt-3 "> In stock! Ships in 5 – 10 business days </p>
                    <p className="text-secondary mb-3 "> 100% secure checkout </p>
                  </div>

                  {crrUser ? <>
                    <div className="wishlist mt-3 text-end"> <i onClick={ ()=> wishlist(productsDetail.id)} className=" favorite fa-solid fa-heart text-secondary fs-3" ></i> </div>
                  </> : <></>}
              
                </div>
            </div>
        </div>
      </div>
    </div> : <LoadingScreen/>}

  </>
  
}







