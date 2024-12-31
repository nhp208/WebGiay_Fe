import styled from 'styled-components';
import { Col, Image, Row } from 'antd';

export const ProductContainer = styled(Row)`
  padding: 32px;
  max-width: 1400px;
  margin: 24px auto;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
`;

export const ImageContainer = styled(Col)`
  .ant-image {
    border-radius: 20px;
    overflow: hidden;
    background: #fff;
    transition: all 0.3s ease;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
    border: 1px solid #f0f0f0;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 500px;
    
    img {
      object-fit: contain;
      mix-blend-mode: multiply;
      max-width: 100%;
      max-height: 100%;
      width: auto !important;
      height: auto !important;
    }
    
    &:hover {
      transform: scale(1.02);
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    }
  }
`;

export const ProductInfo = styled(Col)`
  padding: 0 40px;
`;

export const WrapperStyleNameProduct = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #222;
  margin-bottom: 20px;
  line-height: 1.4;
  letter-spacing: -0.5px;
`;

export const WrapperStylePriceProduct = styled.div`
  font-size: 28px;
  font-weight: 600;
  color: var(--primary-color);
  margin: 16px 0;
`;

export const TextAtt = styled.span`
  font-size: 15px;
  color: #666;
  min-width: 8px;
  display: inline-block;
`;

export const TextAttDetail = styled.span`
  font-size: 15px;
  color: #333;
  font-weight: 500;
  margin-left: 8px;
`;

export const WarpperVariation = styled.div`
  margin: 28px 0;
  padding: 20px;
  background: #fafafa;
  border-radius: 16px;
  border: 1px solid #f0f0f0;
`;

export const WrapperOption = styled.div`
  margin-bottom: 20px;
  
  .ant-select {
    margin-top: 10px;
    
    .ant-select-selector {
      border-radius: 8px;
      height: 45px;
      display: flex;
      align-items: center;
      border: 1px solid #d9d9d9;
      
      &:hover {
        border-color: #ff4d4f;
      }
    }
  }
`;

export const QuantityWrapper = styled.div`
  margin: 28px 0;
  
  .ant-input-number {
    border-radius: 8px;
    height: 45px;
    width: 140px;
    
    .ant-input-number-handler-wrap {
      border-radius: 0 8px 8px 0;
    }
    
    &:hover, &:focus {
      border-color: #ff4d4f;
    }
  }
`;

export const ServicesContainer = styled(Row)`
  margin-top: 36px;
  
  .ant-card {
    height: 180px;
    transition: all 0.3s ease;
    text-align: center;
    border-radius: 16px;
    
    &:hover {
      transform: translateY(-6px);
      box-shadow: 0 8px 24px rgba(0,0,0,0.12);
    }
  }
`;

export const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 24px 0;
  padding: 16px;
  background: #f8f8f8;
  border-radius: 12px;
`;

export const OriginalPrice = styled.span`
  font-size: 20px;
  color: #999;
  text-decoration: line-through;
`;

export const DiscountedPrice = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #ff4d4f;
  letter-spacing: -0.5px;
`;

export const DiscountBadge = styled.div`
  background: #ff4d4f;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.5px;
`;

export const SavedAmount = styled.div`
  color: #52c41a;
  font-size: 14px;
  margin-top: 4px;
`;