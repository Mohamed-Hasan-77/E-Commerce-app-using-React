import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import LoadingScreen from '../loadingScreen/LoadingScreen';
import { Link } from "react-router-dom";


export default function HomeBrandSlider() {

    const settings = {
        className: "center",
        centerMode: true,
        centerPadding: "0px",
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true
    };

    const [allBrands, setAllBrands] =  useState(null);

    async function myBrands() {

        const {data} =  await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
        setAllBrands(data.data);
        }

useEffect(function() {

    myBrands()

}, [])
    
    return <>

            <div >
        <Slider {...settings}>
            {allBrands?  allBrands.map((brand, idx) => <div key={idx} className='pe-4 ps-4 border mx-3 '>
                <Link className="text-decoration-none" to={`/brandProducts/${brand._id}`} >
                    <img className='img-fluid '   src={brand.image} alt={brand.image} />
                    <h4 className='fw-bold text-center p-2 text-white bg-dark' > {brand.name} </h4>
                </Link>
                </div>
            
) : <LoadingScreen/>}
            
        </Slider>
        </div>
    

    </>

}
