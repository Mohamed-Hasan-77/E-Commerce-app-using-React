import axios from 'axios';
import React, { useEffect, useState } from 'react'
import MainHeading from '../MainHeading/MainHeading';
import { Link } from "react-router-dom";
import LoadingScreen from '../loadingScreen/LoadingScreen';
import $ from 'jquery'
import { Helmet } from 'react-helmet';


export default function Favorites() {

const [products, setProducts] = useState(null)


    async function getWishList() {
            
        try {
            const {data} = await axios.get('https://route-ecommerce.onrender.com/api/v1/wishlist', {
                headers: {'token' : localStorage.getItem('tkn')}
            });
            setProducts(data.data);
        } catch(err) {
            // console.log(err);
            $('.wrongMsg').fadeIn(1000, function() {
                setTimeout(() => {
                    $('.wrongMsg').fadeOut(1000);
                }, 500);
                });
        }
    }

    async function reMoveFromWishList(id) {

        document.querySelector('.myFavorite'+id).classList.remove("fa-heart");
        document.querySelector('.myFavorite'+id).classList.add("fa-spinner", 'fa-spin');
        try {
            const {data} = await axios.delete(`https://route-ecommerce.onrender.com/api/v1/wishlist/${id}`, {
                headers: {'token' : localStorage.getItem('tkn')}
            });

            if(data.status == 'success') {
                getWishList()
                $('.successfulMsg').fadeIn(1000, function() {
        
                    setTimeout(() => {
                        $('.successfulMsg').fadeOut(1000);
                    }, 500);
                    });

            }

        } catch(err) {
            // console.log(err);
            $('.wrongMsg').fadeIn(1000, function() {
        
                setTimeout(() => {
                    $('.wrongMsg').fadeOut(1000);
                }, 500);
                });
        }
    }



useEffect( function() {
    getWishList()

}, [])
    return <>

            <Helmet>
                <title> Wishlist </title>
            </Helmet>

        <MainHeading favoritesHeading = 'WishList' />

        <div className="container">
            <div className="items py-3 px-2">
            <div style={{'display': 'none', 'zIndex': '10000', 'width': 'fit-content' }}  className=" shadow mb-4 mx-3 successfulMsg rounded px-3 py-2 position-fixed bg-white bottom-0  start-0 text-center "> <i className="fa-solid fa-thumbs-up fa-bounce text-success"></i> successful  </div>   
        <div style={{'display': 'none', 'zIndex': '10000', 'width': 'fit-content' }}  className=" shadow mb-4 mx-3 wrongMsg rounded px-3 py-2 position-fixed bg-white bottom-0  start-0 text-center "> <i className="fa-solid fa-thumbs-up fa-bounce text-success"></i> something wrong happened  </div> 

            {products?   <div className="row">
                            {products.map(function(pro, idx) {
                            return  <div key={idx}  className="col-md-4 col-lg-3 ">
                                        <div className={` item shadow  rounded mb-4 position-relative `}>
                                        <Link  className="text-decoration-none" to={`/prodetails/${pro.id}`}> 
                                            <div className="">
                                                <img className={`w-100 rounded-top `} src={pro.imageCover} alt="img cover"/>
                                            </div>
                                        </Link>
                                            <div className={`description p-2 pt-2 pb-4  rounded-bottom bg-white `}>
                                                <h6 className=" mt-2 text-danger  fw-bold"> { pro.title.split(" ").slice(0, 2).join(" ") }  </h6>
                                                <p style={{'height': '100px'}} className={`mb-3 text-secondary `} > { pro.description.split(" ").slice(0, 7).join(" ") }  </p>
                                                <div className="pr_rate d-flex justify-content-between">
                                                    <div className='text-dark fw-bold'> {pro.price} EGP </div> 
                                                    <div className={` bg-primary badge rounded-pill `}> {pro.ratingsAverage} <i className="fa-solid fa-star text-warning"></i> </div>
                                                </div>
                                                <button onClick={ ()=> reMoveFromWishList(pro.id)} className="d-flex align-items-center btn btn-danger mt-3 w-100 justify-content-center">  <i  className={` myFavorite${pro.id} fa-solid fa-heart  fs-4 me-2`}></i> <span > Remove From Favorites </span> </button>
                                            </div>
                                        </div>
                                        
                                    </div>
                                })}
                    </div> : <LoadingScreen/>}

                
            </div>
        </div>

    </>

}
