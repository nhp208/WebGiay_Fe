import styled from "styled-components";
import { Card } from 'antd';

export const WrapperCard = styled(Card)`
  width: 100%;
  height: 100%;
  padding: 12px;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0,0,0,0.08);
  }

  .ant-card-cover {
    margin: -12px -12px 12px;
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 240px;
  object-fit: contain;
  border-radius: 8px 8px 0 0;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

export const StyleNameProduct = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 1.4;
  color: #333;
  margin: 8px 0;
  height: 44px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const WrapperPriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

export const WrapperDiscountedPrice = styled.span`
  color: var(--primary-color);
  font-size: 18px;
  font-weight: 600;
`;

export const WrapperOriginalPrice = styled.span`
  color: #999;
  font-size: 14px;
  text-decoration: line-through;
`;

export const WrapperDiscount = styled.span`
  background: #ffeee6;
  color: #ff4d4f;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
`;

export const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 13px;
  color: #666;
`;

export const SoldCount = styled.span`
  color: #999;
`;