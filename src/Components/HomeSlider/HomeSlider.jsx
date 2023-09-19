import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function HomeSlider() {

    const settings = {
        className: "center",
        centerMode: true,
        centerPadding: "0px",
        dots: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true
      };
    
    return <>
            <div >
        <Slider {...settings}>
            <div className='pe-4 ps-4'>
                <img className='w-100 '   src={require('../../finalProject assets/images/slider-image-1.jpeg')} alt='slide1' />
            </div>
            <div className='pe-4 ps-4'>
                <img className='w-100 '  src={require('../../finalProject assets/images/slider-image-2.jpeg')} alt='slide1' />
            </div>
            <div className='pe-4 ps-4'>
                <img className='w-100 '  src={require('../../finalProject assets/images/slider-image-3.jpeg')} alt='slide1' />
            </div>
            <div className='pe-4 ps-4'>
                <img className='w-100 '   src={require('../../finalProject assets/images/slider-image-1.jpeg')} alt='slide1' />
            </div>
            <div className='pe-4 ps-4'>
                <img className='w-100 '  src={require('../../finalProject assets/images/slider-image-2.jpeg')} alt='slide1' />
            </div>
            <div className='pe-4 ps-4'>
                <img className='w-100 '  src={require('../../finalProject assets/images/slider-image-3.jpeg')} alt='slide1' />
            </div>
        </Slider>
        </div>
    

    </>

}
