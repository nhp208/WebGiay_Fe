import React from 'react'
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import Slider1 from '../../assets/images/Slider1.webp'
import Slider2 from '../../assets/images/Slider2.webp'
import Slider3 from '../../assets/images/Slider3.webp'
import CardComponet from '../../components/CardComponent/CardComponent'
import { BannerDot, HeadingTittle, Image, ImageBanner, ImageMainProduct, MainProduct, SpanMainProduct } from './style'
import MainProduct1 from '../../assets/images/MainProduct1.jpg'
import MainProduct2 from '../../assets/images/MainProduct2.jpg'
import MainProduct3 from '../../assets/images/MainProduct3.jpg'
import banner1 from '../../assets/images/banner1.jpg'
import banner2 from '../../assets/images/banner2.jpg'
import { Button, Col, Row, Space } from 'antd'
import { GiftOutlined, ShoppingOutlined } from '@ant-design/icons'
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent'
import MultipleItemsComponent from '../../components/MultipleItemsComponent/MultipleItemsComponent'
import * as ProductService from '../../services/ProductService'
import { useQuery } from '@tanstack/react-query'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
function HomePage(){
  const fetchNewestProducts = async () => {
    const res = await ProductService.getAllProduct({
      limit: 6,
      sort: 'createdAt',
      order: 'desc'
    }); 
    return res;
  }

  const fetchBestDiscountProducts = async () => {
    const res = await ProductService.getAllProduct({
      limit: 6,
      sort: 'discount',
      order: 'desc'
    }); 
    return res;
  }

  const { data: newestProducts } = useQuery({
    queryKey: ['newestProducts'],
    queryFn: fetchNewestProducts,
    retry: 3,
    retryDelay: 1000,
    onSuccess: (data) => {
        console.log('Newest Products:', data);
    }
  })

  const { data: bestDiscountProducts } = useQuery({
    queryKey: ['bestDiscountProducts'],
    queryFn: fetchBestDiscountProducts,
    retry: 3,
    retryDelay: 1000,
    onSuccess: (data) => {
        console.log('Best Discount Products:', data);
    }
  })

  return (
    <div style={{
      padding: '0 clamp(16px, 5vw, 120px)',
      maxWidth: '1440px',
      margin: '0 auto'
    }}>
      <SliderComponent arrImages={[Slider1,Slider2,Slider3]}/>
      <div>
        <HeadingTittle>HẺM SNEAKER - TỰ TIN TỪNG BƯỚC, PHONG CÁCH TỪNG GIÂY!</HeadingTittle>
        <MainProduct>
          <div  style={{position:'relative'}}>
          <ImageMainProduct width={300} src={MainProduct1} preview={false}>
          </ImageMainProduct>

          </div>
          
          <ImageMainProduct width={300} src={MainProduct2} preview={false}></ImageMainProduct>
          <ImageMainProduct width={300} src={MainProduct3} preview={false}></ImageMainProduct>
        </MainProduct>
      </div>
      <div style={{marginBottom:'24px'}}>
        <HeadingTittle box>
          <Space style={{margin:"0 8px"}}>
          <ShoppingOutlined />
          </Space>
          SẢN PHẨM MỚI NHẤT
        </HeadingTittle>
        <Row>
          <Col span={8}>
            <BannerDot>
              <ImageMainProduct width={300} height={400} src={banner1} preview={false}/>
            </BannerDot>
          </Col>
          <Col span={16}>
            <MultipleItemsComponent key={newestProducts} products={newestProducts?.data} />
          </Col>
        </Row>
      </div>
      <div style={{marginBottom:'24px'}}>
        <HeadingTittle box>
          <Space style={{margin:"0 8px"}}>
          <GiftOutlined />
          </Space>
          SẢN PHẨM BÁN CHẠY
        </HeadingTittle>
        <Row>
          <Col span={8}>
            <BannerDot>
              <ImageMainProduct width={300} height={400} src={banner2} preview={false}/>
            </BannerDot>
          </Col>
          <Col span={16}>
            <MultipleItemsComponent key={bestDiscountProducts} products={bestDiscountProducts?.data} />
          </Col>
        </Row>
      </div>
      {/* <NavbarComponent/> */}
    </div>
  )
}
export default HomePage