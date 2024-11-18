import styled from 'styled-components';
import { Col, Image, Row } from 'antd';

export const ProductContainer = styled(Row)`
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
`;

export const ImageContainer = styled(Col)`
  .ant-image {
    border-radius: 12px;
    overflow: hidden;
    background: #f8f8f8;
  }
`;

export const ThumbnailContainer = styled(Row)`
  padding-top: 16px;
  gap: 12px;
  justify-content: flex-start;
`;

export const WrapperStyleColImage = styled(Col)`
  flex-basis: 80px;
  cursor: pointer;
`;

export const WrapperStyleImageSmall = styled(Image)`
  border-radius: 8px;
  border: 2px solid transparent;
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--primary-color);
    transform: scale(1.05);
  }
`;

export const ProductInfo = styled(Col)`
  padding: 0 40px;
`;

export const WrapperStyleNameProduct = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
  line-height: 1.4;
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
  min-width: 120px;
  display: inline-block;
`;

export const TextAttDetail = styled.span`
  font-size: 15px;
  color: #333;
  font-weight: 500;
  margin-left: 8px;
`;

export const WarpperVariation = styled.div`
  margin: 24px 0;
  padding: 16px;
  background: #f8f8f8;
  border-radius: 12px;
`;

export const WrapperOption = styled.div`
  margin-bottom: 16px;
  
  .ant-select {
    margin-top: 8px;
  }
`;

export const QuantityWrapper = styled.div`
  margin: 24px 0;
  
  .ant-input-number {
    border-radius: 8px;
    
    &:hover, &:focus {
      border-color: var(--primary-color);
    }
  }
`;

export const ServicesContainer = styled(Row)`
  margin-top: 32px;
  
  .ant-card {
    height: 160px;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
  }
`;

export const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 20px 0;
`;

export const OriginalPrice = styled.span`
  font-size: 20px;
  color: #999;
  text-decoration: line-through;
`;

export const DiscountedPrice = styled.div`
  font-size: 28px;
  font-weight: 600;
  color: var(--primary-color);
`;

export const DiscountBadge = styled.div`
  background: #ffeee6;
  color: #ff4d4f;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
`;

export const SavedAmount = styled.div`
  color: #52c41a;
  font-size: 14px;
  margin-top: 4px;
`;