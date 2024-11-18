import React from 'react'
import Slider from "react-slick";
import {Image} from 'antd';
function SliderComponent({arrImages}) {
    var settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
        speed: 2000,
        autoplaySpeed: 1500,
        cssEase: "linear"
    };
    return (
            <Slider className="slider-container" style={{textAlign: 'center'}} {...settings}>
                {arrImages.map((image)=>{
                    return (
                        <div>
                            <Image  src={image} alt='Slider' preview={false}/>

                        </div>
                    )
                })

                }
            </Slider>
    )
}

export default SliderComponent