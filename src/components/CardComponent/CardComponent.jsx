import React from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import {
  WrapperCard,
  ProductImage,
  StyleNameProduct,
  WrapperPriceContainer,
  WrapperDiscountedPrice,
  WrapperOriginalPrice,
  WrapperDiscount,
  ProductInfo,
  SoldCount
} from './style';

function CardComponent(props) {
  const { image, name, price, discount, NumberProductsSold, id } = props;
  const navigate = useNavigate();

  const formatCurrency = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "Đ";
  };

  const handleDetailsProduct = (id) => {
    navigate(`/ProductDetail/${id}`);
  };

  const discountedPrice = discount ? price * (1 - discount / 100) : price;

  return (
    <WrapperCard
      hoverable
      cover={<ProductImage alt="Ảnh sản phẩm" src={image} />}
      onClick={() => handleDetailsProduct(id)}
    >
      <StyleNameProduct>{name}</StyleNameProduct>

      <ProductInfo>
        <SoldCount>Đã bán: {NumberProductsSold}</SoldCount>
      </ProductInfo>

      <WrapperPriceContainer>
        <WrapperDiscountedPrice>{formatCurrency(discountedPrice)}</WrapperDiscountedPrice>
        {discount > 0 && (
          <>
            <WrapperOriginalPrice>{formatCurrency(price)}</WrapperOriginalPrice>
            <WrapperDiscount>-{discount}%</WrapperDiscount>
          </>
        )}
      </WrapperPriceContainer>

      <ButtonComponent
        size="large"
        style={{
          background: 'var(--primary-color)',
          width: '100%',
          borderRadius: '6px',
          height: '40px'
        }}
        styleTextButton={{ color: '#fff', fontWeight: '500' }}
        textButton="Xem chi tiết"
        onClick={() => handleDetailsProduct(id)}
      />
    </WrapperCard>
  );
}

export default CardComponent;
