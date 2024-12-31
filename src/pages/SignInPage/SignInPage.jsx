import React, { useEffect, useState } from 'react'
import { ContainerSign, WrapperLeft, WrapperRight, WrapperSign } from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { Image } from 'antd'
import LoginImg from '../../assets/images/LoginImg.png'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutation'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux'
import {updateUser} from '../../redux/user/userSlice'
import { loginSuccess } from '../../redux/auth/authSlice';

function SignInPage() {
  const [isShowPw,setIsShowPw]=useState(false)
  const [pw,setPw]=useState('')
  const [email,setEmail]=useState('')
  const dispatch=useDispatch();
  const location=useLocation();
  const handleOnChangeEmail=(e)=>{
    setEmail(e.target.value)
  }
  const handleOnChangePw=(e)=>{
    setPw(e.target.value)
  }
  const navigate=useNavigate()
  const mutation = useMutationHooks(
   data => UserService.loginUser(data)
  )
  console.log('mutation',mutation)
  const handleNavigateSignUp=()=>{
    navigate('/sign-up')
  }
  const handleSignIn=()=>{
    mutation.mutate({
      email,
      password:pw
    })
  }
  const {data,isPending,isSuccess}=mutation
  useEffect(()=>{
    if(data?.status === "OK"){
      localStorage.setItem('access_Token',JSON.stringify(data.access_Token))
      if(data?.access_Token){
        const decode=jwtDecode(data?.access_Token)
        if(decode?.id){
          handleGetDetailsUser(decode?.id,data?.access_Token)
          dispatch(loginSuccess(data?.access_Token))
        }
      }
      console.log('location',location)
      if(location.state){
        navigate(location.state)
      }else{
      navigate('/')
      }
    }
    
  }, [data, location, navigate, dispatch])
  const handleGetDetailsUser = async (id,token)=>{
    const res =await UserService.getDetailsUser(id,token)
    dispatch(updateUser({...res?.data,access_Token: token}))
  }
  
  return (
    <ContainerSign>
      <WrapperSign>
          <h1 style={{fontSize:'24px'}}>Xin Chào</h1>
          <p style={{fontSize:'20px',color:'#555555'}}>Đăng nhập hoặc <a onClick={handleNavigateSignUp} style={{color:'#b61a1a',textDecoration:'none'}}href="">tạo tài khoản</a></p>
          <label style={{fontSize:'16px',color:'#222222'}} htmlFor="">Email *</label>
          <InputForm placeholder='Nhập tên tài khoản hoặc email...' value={email} onChange={handleOnChangeEmail}/>
          <label style={{fontSize:'16px',color:'#222222'}} htmlFor="">Mật khẩu *</label>
          <InputForm type={isShowPw?'text':'password'} placeholder='Nhập mật khẩu...' value={pw} onChange={handleOnChangePw}/>
      
          <div style={{position:'relative',left:'96%',top:'-35px'}}>
            <div onClick={()=>{setIsShowPw(!isShowPw)}}style={{fontSize:'16px'}}>
              {!isShowPw?(<EyeOutlined/>):(<EyeInvisibleOutlined/>)}
            </div>

          </div>
          {data?.status ==='ERR'&&<span style={{color:'red'}}>{data?.message}</span>}
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'end'}}>
            <LoadingComponent delay={500} isLoading={isPending}>
              <ButtonComponent 
              disabled={!email.length||!pw.length}
              onClick={handleSignIn}
              styleButton={{color:'#fff',backgroundColor:'#b61a1a',width:'150px'}} 
              textButton={'Đăng nhập'}/>
            </LoadingComponent>
            <a style={{color:'#b61a1a',fontSize:'14px'}}href="">Quên Mật Khẩu</a>
            
          </div>
          
        </WrapperSign>

    </ContainerSign>
   
  )
}

export default SignInPage