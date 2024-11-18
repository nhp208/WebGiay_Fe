import { Col, Image, Row } from 'antd';
import styled from 'styled-components';
import { Button } from "antd";
import "../../index.css";
export const WrapperHeader = styled(Row)`
    
    height: 91px;
    margin: 0 72px;
    display:flex;
    justify-content:space-around;
    align-items:center;
`
export const ButtonPrimary = styled(Button)`
    margin-left:24px;
    padding: 8px 16px;
    background:var(--primary-color);
`
export const WrapperSlogan=styled.div`
    display:flex;
    justify-content:space-around;
    align-items:center;
    background: #9b2420;
    min-height: 30px;
    align-items:center
    margin:"0 72px"

`
export const Logo = styled.img`
    // width:30%;
    // z-index:-10;
    heigth:80px;
    width:80px;
`
export const Logan = styled.span`
    color: #fff;
    font-size: 18px;
`
export const SocialIcons = styled.div`
    display:flex;
    color: #fff;
    font-size: 18px;
    min-height: 30px;
    width:auto;
    align-items:center
`
export const WrapperNavbar = styled.div`
    display:flex;
    // justify-content:space-around;
    align-items:center;
    color:#fff;
    height:40px;
    background: #333333;
`
export const NavbarLink= styled.a`
    font-size:16px;
    padding: 4px 8px;
    margin:0 8px;
    color:#e3e3e3;
    cursor:pointer;
    &:hover{
        opacity:0.7;
    }
`
export const WrapperConttentPopup = styled.p`
    cursor:pointer;
    &:hover{
        color:rgb(182, 26, 26);
    }
`
export const WrapperUser=styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
`