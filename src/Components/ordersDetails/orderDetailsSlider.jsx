
import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";


export default function OrderSlider({orderImages}) {
    // console.log(props.orderImages);


    // const res = props.orderImages.map((ele) => {
    //     return ele
    // })
    // console.log(res);
    const settings = {
        className: "center",
        centerMode: true,
        centerPadding: "0px",
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true
    };

    return <>
            <div >
        <Slider {...settings}>

            {orderImages.map((img, idx) => {
                return  <div key={idx} className='pe-4 ps-4 position-relative'>
                            <Link  className="text-decoration-none" to={`/prodetails/${img.product.id}`}>
                                <img className='w-100 shadow' src={img.product.imageCover} alt='slider' />
                                <span  className="position-absolute top-0 start-100  badge rounded-pill bg-danger"> {img.count} </span>
                                <p className='w-100 bg-dark text-white text-center' >{img.price} EGP </p>
                            </Link>
                        </div>
            })}


            {/* <div className='pe-4 ps-4'>
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
            </div> */}
        </Slider>
        </div>
    

    </>

}