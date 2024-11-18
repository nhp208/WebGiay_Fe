import styled from 'styled-components';
import "../../index.css";
import { Image } from 'antd'
export const HeadingTittle = styled.div`
    color: var(--primary-color);
    text-align: center;
    font-size: 28px;
    font-weight: 700;
    margin: 32px auto;
    width: fit-content;
    padding: ${props => props.box ? '8px 16px' : '4px'};
    border: ${props => props.box ? '3px solid' : 'none'};
    position: relative;
    
    &:hover {
      transform: ${props => props.box ? 'translateY(-2px)' : 'none'};
      transition: transform 0.3s ease;
    }
`
export const MainProduct = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 24px;
    margin: 0 auto;
    max-width: 1200px;
    
    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`
export const ImageMainProduct = styled(Image)`
    transition: transform 0.3s ease;
    
    &:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
`
export const BannerDot = styled.div`
    position: relative;
    
    &::before {
        border-left: 2px dashed #dadada;
        content: "";
        height: 100%;
        width: 4px;
        right: 10%;
        position: absolute;
        top: 0;
        opacity: 0.8;
    }
    
    &:hover ${ImageMainProduct} {
        transform: scale(1.02);
    }
`