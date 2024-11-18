import styled from 'styled-components';
import { Table } from 'antd';
export const TableCart=styled(Table)`
    & ul.ant-pagination.ant-table-pagination.ant-table-pagination-right.css-dev-only-do-not-override-lkckba{
        display:none;
    }
`
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

export const TotalLabelCell = styled(Table.Summary.Cell)`
  font-size: 18px;
  font-weight: bold;
  padding: 20px 8px;
`;

export const TotalPriceCell = styled(Table.Summary.Cell)`
  text-align: right;
  font-size: 24px;
  font-weight: bold;
  color: #ee4d2d;
  padding: 20px 8px;
`;

export const DividerCell = styled(Table.Summary.Cell)`
  padding: 8px 0;
`;

export const DividerLine = styled.div`
  border-top: 2px dashed #e8e8e8;
  margin: 0 16px;
`;
