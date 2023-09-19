import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import sliderCss from './slider.module.css'

export default function ProSlider({sliderImg}) {

    var settings = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        pauseOnHover: true
    };

    return <>

            <div className={`${sliderCss.myslider}`} >
                    <Slider {...settings}>
                        {sliderImg.map((img, idx) => { return <div key={idx}>
                                        <img className='w-100' src={img} alt="product imgs" />
                                    </div> 
                            
                        })}
                    {/* <div>
                        <img className='w-100' src={sliderImg[1]} alt="product imgs" />
                    </div>
                    <div>
                        <img className='w-100' src={sliderImg[2]} alt="product imgs" />
                    </div>
                    <div>
                        <img className='w-100' src={sliderImg[3]} alt="product imgs" />
                    </div>
                    <div>
                        <img className='w-100' src={sliderImg[4]} alt="product imgs" />
                    </div>
                    <div>
                        <img className='w-100' src={sliderImg[5]} alt="product imgs" />
                    </div> */}
                    </Slider>
            </div>


    </>

}
