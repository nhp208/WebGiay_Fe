import styled from 'styled-components';
import { Table, Card, Button, Typography, Space } from 'antd';

const { Text } = Typography;

export const PageContainer = styled.div`
  padding: 24px;
`;

export const StyledTable = styled(Table)`
  .ant-table-cell {
    vertical-align: middle;
  }
`;

export const StyledSummaryRow = styled(Table.Summary.Row)`
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #fafafa;
    cursor: default;
  }
  
  .price-value {
    display: inline-block;
    transition: all 0.3s ease;
    
    &:hover {
      transform: scale(1.05);
    }
  }
`;

export const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const PriceCell = styled(Table.Summary.Cell)`
  text-align: right;
  padding: 16px 8px;
  font-weight: 500;
`;

export const LabelCell = styled(Table.Summary.Cell)`
  color: #666;
  padding: 16px 8px;
`;

export const StyledTotalRow = styled(Table.Summary.Row)`
  background-color: #fff8f6;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #fff0ec;
    
    .total-value {
      transform: scale(1.1);
      text-shadow: 0 0 12px rgba(238, 77, 45, 0.2);
    }
  }
`;

export const InfoCard = styled(Card)`
  margin-top: 24px;
  
  .ant-card-head-title {
    font-weight: 600;
  }
`;

export const InfoText = styled(Text)`
  display: block;
  margin-bottom: 8px;
  
  strong {
    margin-right: 8px;
  }
`;

export const ButtonGroup = styled(Space)`
  margin-top: 24px;
`;

export const BackButton = styled(Button)`
  &:hover {
    color: #40a9ff;
    border-color: #40a9ff;
  }
`;

export const OrderButton = styled(Button)`
  background: #ee4d2d;
  border-color: #ee4d2d;
  
  &:hover {
    background: #d03f23;
    border-color: #d03f23;
  }
`; 