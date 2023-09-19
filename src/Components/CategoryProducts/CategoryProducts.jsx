import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom";
import LoadingScreen from '../loadingScreen/LoadingScreen';
import MainHeading from '../MainHeading/MainHeading';
import $ from 'jquery'
import { Helmet } from 'react-helmet';


export default function CategoryProducts() {

    const {id} = useParams();

    const [proCard, setProCard] = useState(null);

    async function getProCard() {
        
        try {
        const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`, {
            params: {'category' : id}
        });
        setProCard(data.data);
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
        getProCard();
    }, []);


    return <>
    {proCard ?  <div className="container py-5">
        
        <div className="row">

        <div style={{'display': 'none', 'zIndex': '10000', 'width': 'fit-content' }}  className=" shadow mb-4 mx-3 wrong rounded px-3 py-2 position-fixed bg-white bottom-0  start-0 text-center "> <i className="fa-solid fa-circle-xmark text-danger"></i> something wrong happened </div>   
        { proCard.length === 0 ? <div className="row py-5 my-5 text-center ">
                    <h2 className="title text-danger fw-bold fs-1"> No Products Found ...  </h2>
                    <Link className="text-decoration-none" to={`/categories`} > <p className='text-secondary fs-5 '> Go Back <i className="fa-solid fa-arrow-left fa-bounce fw-bold"></i> </p> </Link>

                    <Helmet>
                            <title> No Products Found </title>
                    </Helmet>
            </div> : <>

            <Helmet>
                <title> {proCard[0].category.name} </title>
            </Helmet>
            
            <MainHeading pageCategoryProducts = {proCard[0].category.name} /> 

            {proCard.map(function(pro, idx) {
                return  <div key={idx}  className="col-md-3 ">
                            <Link  className="text-decoration-none" to={`/prodetails/${pro._id}`}> 
                            <div className={` item shadow  rounded mb-4 position-relative `}>
                                <div className="">
                                    <img className={`w-100 rounded-top `} src={pro.imageCover} alt="img cover"/>
                                </div>
                                <div className={`description p-2 pt-2 pb-4  rounded-bottom  `}>
                                    <h6 className=" mt-2 text-danger  fw-bold"> {pro.title.split(" ").slice(0, 2).join(" ")} </h6>
                                    <p className={`mb-3 text-secondary `} > {pro.description.split(" ").slice(0, 3).join(" ")}... </p>
                                    <div className="pr_rate d-flex justify-content-between">
                                        <div className='text-warning fw-bold'> {pro.price} EGP </div> 
                                        <div className={` bg-primary badge rounded-pill `}> {pro.ratingsAverage} <i className="fa-solid fa-star text-warning"></i> </div>
                                    </div> 
                                </div>
                            </div>
                            </Link>
                        </div>
            }) }
            
            </>
            }


        </div>
    </div>  : <LoadingScreen/>}



    {/* <div className="container py-5">
        <div className="row">
            <div  className="col-md-4 col-lg-2 ">
                <div className={` item shadow  rounded mb-4 position-relative`}>
                    <div className="">
                        <img className={`w-100 rounded-top `} src={require("../../finalProject assets/images/assortment-citrus-fruits.png")} alt="img cover"/>
                    </div>
                    <div className={`description p-2 pt-2 pb-4  rounded-bottom  `}>
                        <h6 className=" mt-2 text-danger  fw-bold"> title </h6>
                        <p className={`mb-3 `} > description </p>
                        <div className="pr_rate d-flex justify-content-between">
                            <div className='text-warning fw-bold'> 400 EGP </div> 
                            <div className={` bg-primary badge rounded-pill `}> 4.5 <i class="fa-solid fa-star text-warning"></i> </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> */}




    </>
}

