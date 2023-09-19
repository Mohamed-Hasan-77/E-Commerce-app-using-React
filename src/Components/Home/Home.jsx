import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import LoadingScreen from "../loadingScreen/LoadingScreen";
import homeCss from "./home.module.css"
import { Link } from "react-router-dom";
import HomeSlider from './../HomeSlider/HomeSlider';
import MainHeading from "../MainHeading/MainHeading";
import { cartContext } from "../Context/CartContext";
import $ from 'jquery'
import HomeBrandSlider from "../HomeSlider/HomeBrandSlider";
import { Helmet } from "react-helmet";

export default function Home({crrUser}) {


const {addProductToCart} = useContext(cartContext);




  const pageTitle = "Our Products"

  const [allProducts, setAllProducts] = useState(null)


  async function getAllProducts() {
    
    try {
      const {data} = await axios.get('https://route-ecommerce.onrender.com/api/v1/products', );
      
      setAllProducts(data.data);
    } catch(err) {
      // console.log(err);
      $('.wrong').fadeIn(1000, function() {
    
        setTimeout(() => {
            $('.wrong').fadeOut(1000);
        }, 2000);
        });
      
    }
  }


  async function addProduct(id, idx) {
    document.querySelector('.addTo'+idx).style.display = 'none';
    document.querySelector('.spinnerUpdates'+idx).style.display = 'block';
    setTimeout(() => {
      document.querySelector('.addTo'+idx).style.display = 'block';
      document.querySelector('.spinnerUpdates'+idx).style.display = 'none';
  
  }, 2000);

    if( await addProductToCart(id) == true ) {

    //   document.querySelector('.addToCart'+idx).innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
      
    //   setTimeout(() => {
    //   document.getElementsByClassName('addToCart'+idx)[0].innerHTML = 'Add to Cart';
    
    // }, 1000);
    $('.successful').fadeIn(1000, function() {
    
    setTimeout(() => {
        $('.successful').fadeOut(1000);
    }, 2000);
    });
  
    } else {
  
      document.querySelector('.addToCart'+idx).innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
  
      setTimeout(() => {
      document.getElementsByClassName('addToCart'+idx)[0].innerHTML = 'Add to Cart';
  
    }, 2000);
    $('.wrong').fadeIn(1000, function() {
  
    setTimeout(() => {
        $('.wrong').fadeOut(1000);
    }, 2000);
    });
  

    }
  
  
  }




  function wishlist(idx, id) {

    document.querySelector('.favorite'+idx).classList.toggle("text-danger");
    document.querySelector('.favorite'+idx).classList.add("fa-bounce");

    if(document.querySelector('.favorite'+idx).classList.contains('text-danger')) {

      addToWishList(id);
      setTimeout(() => {
        document.querySelector('.favorite'+idx).classList.remove("fa-bounce");
        }, 1000)

    } else {

      reMoveFromWishList(id);
      setTimeout(() => {
        document.querySelector('.favorite'+idx).classList.remove("fa-bounce");
        }, 1000)

    }

  }


    async function reMoveFromWishList(id) {
              
      try {
          const {data} = await axios.delete(`https://route-ecommerce.onrender.com/api/v1/wishlist/${id}`, {
              headers: {'token' : localStorage.getItem('tkn')}
          });

      } catch(err) {
          // console.log(err);
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
        // console.log(err);
        $('.wrong').fadeIn(1000, function() {
    
          setTimeout(() => {
              $('.wrong').fadeOut(1000);
          }, 2000);
          });
    }
  }

  useEffect(function() {
    getAllProducts();
  }, []);
  
  
  



  return <>
  
      <Helmet>
        <title> Home </title>
      </Helmet>
  
    {allProducts?   <div className="container p-2 ">






        <MainHeading pageHome = {pageTitle} />

    <div className={`py-5  ${homeCss.slider_none}`}>
        <HomeSlider/>


    </div>

    <div className={` mb-5   ${homeCss.slider_none}`}>

        <HomeBrandSlider/>


    </div>




    <div className="row d-flex flex-wrap">

    <div style={{'display': 'none', 'zIndex': '10000', 'width': 'fit-content' }}  className=" shadow mb-4 mx-3 successful rounded px-3 py-2 position-fixed bg-white bottom-0  start-0 text-center "> <i className="fa-solid fa-thumbs-up fa-bounce text-success"></i> Product Was Added to your cart  </div>   
    <div style={{'display': 'none', 'zIndex': '10000', 'width': 'fit-content' }}  className=" shadow mb-4 mx-3 wrong rounded px-3 py-2 position-fixed bg-white bottom-0  start-0 text-center "> <i className="fa-solid fa-circle-xmark text-danger"></i> something wrong happened </div>   
    {allProducts.map( function(pro, idx){ return   <div key = {idx} className="col-md-4 col-lg-2 ">

        <div className={` item  rounded mb-4 position-relative ${homeCss.product}`}>
        <Link  className="text-decoration-none" to={`/prodetails/${pro.id}`}> 
          <div className={` ${homeCss.imghover}`}>
          <img className={`w-100 rounded-top ${homeCss.imghover}`} src={pro.imageCover} alt="img cover"/>

          </div>

        </Link>
          <div className={`description p-2 pt-2 pb-2  rounded-bottom ${homeCss.desc} `}>
            <h6 className=" mt-2 text-danger  fw-bold"> { pro.title.split(" ").slice(0, 2).join(" ")} </h6>
            <p className={`mb-3 ${homeCss.cat}`} >{pro.category.name} </p>
            <div className={` bg-primary badge rounded-pill ${homeCss.rate}`}> { pro.ratingsAverage } <i className="fa-solid fa-star text-warning"></i> </div>
            <span> {pro.priceAfterDiscount ? <>
                        <span className={`text-black fw-bold ${homeCss.price} `} > {pro.priceAfterDiscount} EGP </span>
                        <span className={`text-decoration-line-through me-2 text-secondary ${homeCss.price} `} > {pro.price} EGP </span> 
                  </> : <span className={`text-black fw-bold ${homeCss.price} `}> {pro.price} EGP</span> }   </span>
              {/* <i class={`${homeCss.fav} fa-regular fa-heart text-danger`}></i> */}
              {crrUser ? <>
                <i onClick={ ()=> wishlist(idx, pro.id)} className={`${homeCss.fav} favorite${idx} fa-solid fa-heart text-secondary `}></i>
              <div onClick={() => addProduct(pro.id, idx)} className={`btn btn-primary mt-3 w-100 addToCart${idx} ${homeCss.addToCart}`}>  <span className={`addTo${idx}`} > Add To Cart </span> <i  style={{'display': 'none'}} className={`fa-solid fa-spinner fa-spin spinnerUpdates${idx} my-1`}></i> </div>
              
              </> : ""}
              
              
          </div>

        </div>


      </div>})}


    </div>
  </div> : <LoadingScreen/>}
          


  
  </>;
}
