import React, { useEffect, useState } from 'react'
import { Badge, Grid, Popover } from "antd"
import { Col, Row,Input, Space } from 'antd';
import { Button, ButtonPrimary, Logan, WrapperHeader, WrapperSlogan,SocialIcons, Logo, WrapperNavbar, NavbarLink, WrapperConttentPopup, WrapperUser } from './style';
import {
  ShoppingCartOutlined,
  FacebookOutlined, 
  InstagramOutlined,
  TwitterOutlined,
  MailOutlined,
  UserOutlined
} from '@ant-design/icons';
import "../../index.css";
import * as UserService from '../../services/UserService';
import Logo_img from '../../assets/images/logo.jpg'
import {ButtonInputSearch} from '../ButtonInputSearch/ButtonInputSearch'
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetUser } from '../../redux/user/userSlice';
import { searchProduct } from '../../redux/product/productSlice';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
export function HeaderComponent() {
  const navigate = useNavigate()
  const handleNavigateLogin=()=>{
    navigate('/sign-in')
  }
  const user=useSelector((state)=> state.user)
  const dispatch=useDispatch();
  const [Loading,setLoading]=useState(false)
  const [userName,setUserName]=useState(user?.name)
  const [userAvatar,setUserAvatar]=useState('')
  const handleLogout= async ()=>{
    await UserService.logoutUser();
    localStorage.removeItem("access_Token");
    setLoading(true);
    dispatch(resetUser(user));
    setLoading(false);
  }
  console.log('user',user)

  useEffect(()=>{
    setLoading(true)
    setUserName(user?.name)
    setUserAvatar(user?.avatar)
    setLoading(false)
  },[user])

  const content = (
    <div>
      <WrapperConttentPopup onClick={()=>navigate('/Profile')}>Thông tin cá nhân</WrapperConttentPopup>
      <WrapperConttentPopup onClick={()=>navigate('/MyOrders')}>Đơn hàng của tôi</WrapperConttentPopup>
      {user?.isAdmin&&(
      <WrapperConttentPopup onClick={()=>navigate('/system/admin')}>Quản lý hệ thống</WrapperConttentPopup>

      )}
      <WrapperConttentPopup onClick={handleLogout}>Đăng xuất</WrapperConttentPopup>
    </div>
  );
  const [search,setSearch]=useState('');
  const onChange=(e)=>{
    setSearch(e.target.value)
  }
  const onSearch=(e)=>{
    dispatch(searchProduct(search))
  }
  //Order
  const order=useSelector((state)=>state.order)
  return (
    <div style={{}}>
      <WrapperSlogan>
        <Logan>
        "HẺM SNEAKER - TỰ TIN TỪNG BƯỚC, PHONG CÁCH TỪNG GIÂY"
        </Logan>
        <SocialIcons>
          <Space>
            <FacebookOutlined />
            <InstagramOutlined />
            <TwitterOutlined />
            <MailOutlined />
          </Space>
        </SocialIcons>
      </WrapperSlogan>
       <WrapperHeader>
        <Col span={6}>
            <Logo src={Logo_img}/>
        </Col>
        <Col span={12}>
          <ButtonInputSearch
          backgroundColorButton='var(--primary-color)'
          size='large'
          textButton='Tìm kiếm'
          bordered={false}
           placeholder="Nhập thông tin cần tìm kiếm..."  enterButton 
           onChange={onChange}
           onClick={onSearch}
           />
        </Col>
        <Col span={6} style={{display:'flex',gap:'20px',alignItems:'center' , justifyContent:'space-around'}}>
          
            <LoadingComponent isLoading={Loading}>
              {user?.email ? (
                <Popover placement="bottomLeft" content={content}>
                  <WrapperUser>
                    {user?.avatar ? (
                      <img src={user.avatar} alt='avatar' style={{
                        height:'60px',
                        width:'60px',
                        borderRadius:'50%',
                        objectFit:'cover',
                        margin: '0 10px 0 20px',
                        border:'1px solid #ccc'
                      }}/>
                    ):(<UserOutlined/>)}
                     <div>{userName||user.email}</div>
                  </WrapperUser>
                </Popover>
            
              ):(
                <div style={{marginLeft: '20px'}}  onClick={handleNavigateLogin}>
                <ButtonComponent  size='large' textButton={'Login'}></ButtonComponent>
                </div>
              )}
            </LoadingComponent>
  

            <Badge style={{marginRight:0}} count={user?.email ? order?.orderItems?.length : 0}>
              <ButtonComponent 
                size='large' 
                textButton={'Giỏ hàng'} 
                onClick={()=>navigate('/order')} 
                icon={<ShoppingCartOutlined />}
              />
            </Badge>

        </Col>
      </WrapperHeader>
      <WrapperNavbar>   
            <NavbarLink name={'Trang chủ'} href='/'>Trang chủ</NavbarLink>
            <NavbarLink name={'Giới thiệu'}>Giới thiệu</NavbarLink>
            <NavbarLink name={'Sản phẩm'} href='/product'>Sản phẩm</NavbarLink>
      </WrapperNavbar>
    </div>
  )
}

