import axios from 'axios'
import React, { useEffect, useState } from 'react'
import LoadingScreen from '../loadingScreen/LoadingScreen';
import { Link } from "react-router-dom";
import MainHeading from '../MainHeading/MainHeading';
import { Helmet } from 'react-helmet';
import $ from 'jquery'

export default function Brands() {

    const pageTitle = "Brands";

    const [allBrands, setAllBrands] =  useState(null);

    async function getAllBrands() {

        try {
            const {data} =  await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
            console.log(data);
            setAllBrands(data.data);      
        } catch(err) {
            $('.wrong').fadeIn(1000, function() {
    
                setTimeout(() => {
                    $('.wrong').fadeOut(1000);
                }, 2000);
                });
        }
    }

    useEffect(function() {

        getAllBrands()

    }, [])

    return  <>

            <Helmet>
                <title> Brands </title>
            </Helmet>
            {allBrands ?   <div className="container mt-5">
                {/* <div className="row py-5 mb-4 mt-4 text-center">
                        <h2 className="title text-danger fw-bold fs-1"> Our Brands </h2>
                        <p className='text-secondary'>Lorem ipsum dolor sit amet consectetur</p>
                </div> */}
                    <div style={{'display': 'none', 'zIndex': '10000', 'width': 'fit-content' }}  className=" shadow mb-4 mx-3 wrong rounded px-3 py-2 position-fixed bg-white bottom-0  start-0 text-center "> <i className="fa-solid fa-circle-xmark text-danger"></i> something wrong happened </div>   

                <MainHeading pageBrands = {pageTitle}/>
                <div className="row">

                {allBrands.map(function(brand, idx)  { 
                return <div key={idx} className=" col-md-3 ">
                    <Link className="text-decoration-none" to={`/brandProducts/${brand._id}`} >
                        <div className="brand mb-5 rounded shadow ">
                            <img className='img-fluid' src ={brand.image} alt='brand'/>
                            <h4 className='fw-bold text-center p-2 text-white bg-dark' > {brand.name} </h4>
                        </div>
                        </Link>
                    </div> })}

                    </div>

            </div> : <LoadingScreen/>}

    </>

}
