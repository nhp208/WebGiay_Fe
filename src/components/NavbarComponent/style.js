import styled from "styled-components";
import "../../index.css"
import { AutoComplete, Slider } from "antd";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
export const WrapperLabelText = styled.span`
    font-size: 2.4em;
    font-weight: 600;
    color: #777777;
    text-transform: uppercase;
    letter-spacing: .05em;
`
export const WrapperTextValue = styled.div`
    color: var(--primary-color);
    text-decoration:none;
    font-size:1.6em;
    margin:8px 0;
    font-weight: 500;
    cursor: pointer;

`
export const NavbarContainer = styled.div`
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
`;

export const WrapperContent = styled.div`
    display:flex;
    align-items:flex-start;
    flex-direction:column;
    margin: 8px 0 28px 0;
    width: 100%;
    box-sizing: border-box;
    

`
export const CustomAutoComplete = styled(AutoComplete)`
  .ant-select-item {
    padding: 8px 12px;
    
    &:hover {
      background-color: #f5f5f5;
    }
  }

  .ant-select-item-option-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .brand-suggestion-label {
    color: #8c8c8c;
    font-size: 12px;
    margin-left: 8px;
  }
`;

export const PriceRangeContainer = styled.div`
  margin-bottom: 30px;
  width: 100%;
  padding: 0 8px;
  box-sizing: border-box;
`;

export const PriceDisplay = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 16px;
  gap: 8px;
`;

export const PriceBox = styled.div`
  padding: 4px 8px;
  background-color: #f5f5f5;
  border-radius: 4px;
  flex: 1;
  text-align: center;
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ButtonContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  box-sizing: border-box;
`;

export const StyledButton = styled(ButtonComponent)`
  width: 100%;
  padding: 10px 0;
  border-radius: 4px;
  margin-bottom: ${props => props.marginBottom || '0'};
  background-color: ${props => props.bgColor || '#b61a1a'};
  color: ${props => props.textColor || '#fff'};
  border: ${props => props.border || 'none'};
`;
export const StyledSlider = styled(Slider)`
  padding: 10px 0;
  
  .ant-slider-rail {
    height: 10px;
    background-color: #e1e1e1;
    border-radius: 5px;
  }

  .ant-slider-track {
    height: 10px;
    background-color: #b61a1a;
    border-radius: 5px;
  }

  .ant-slider-handle {
    width: 20px;
    height: 20px;
    margin-top: -5px;
    background-color: white;
    border: 2px solid #b61a1a;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    opacity: 1;

    &:hover {
      border-color: #b61a1a;
    }

    &:focus {
      border-color: #b61a1a;
      box-shadow: 0 0 0 5px rgba(182, 26, 26, 0.12);
    }

    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 6px;
      height: 6px;
      background-color: #b61a1a;
      border-radius: 50%;
    }
  }

  .ant-tooltip {
    min-width: 80px;
  }

  .ant-slider-tooltip .ant-tooltip-inner {
    background-color: #b61a1a;
    color: white;
    font-size: 12px;
    padding: 4px 8px;
  }
`;