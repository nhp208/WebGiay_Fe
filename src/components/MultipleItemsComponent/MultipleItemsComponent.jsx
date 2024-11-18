import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardComponent from "../CardComponent/CardComponent";
import { NextArrow, PrevArrow, WrapperItem } from "./style";
export function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", }}
        onClick={onClick}
      />
    );
  }
  
  export function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block",  }}
        onClick={onClick}
      />
    );
  }
function MultipleItemsComponent({products=[]}) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow style={{color:"var(--primary-color)"}} />,
    prevArrow: <PrevArrow style={{color:"var(--primary-color)"}} />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    
    <div className="slider-container" 
          style={{
            margin: "32px 16px",
            padding: "0 24px",
            maxWidth: "100%"
          }}>
        
      <Slider {...settings}>
        {products.map((product)=>{
            return(
              <WrapperItem>
                <CardComponent 
                key={product._id} 
                countInStock={product.countInStock} 
                description={product.description} 
                image={product.image} 
                name={product.name}
                price={product.price}
                type={product.type}
                id={product._id} />
                

              </WrapperItem>
            )
        })}
        
      </Slider>
    </div>
  );
}

export default MultipleItemsComponent;
