import React, { useEffect, useState } from 'react'
import { ContainerSign, WrapperLeft, WrapperRight, WrapperSign } from './style.js'
import InputForm from '../../components/InputForm/InputForm.jsx'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { useNavigate } from 'react-router-dom'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutation'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent.jsx'
import * as message from '../../components/Message/Message.jsx'
function SignUpPage() {
  const [isShowPw,setIsShowPw]=useState(false)
  const [isShowConfirmPw,setIsShowConfirmPw]=useState(false)
  const [confirmPw,setConfirmPw]=useState('')
  const [pw,setPw]=useState('')
  const [email,setEmail]=useState('')
  const handleOnChangeEmail=(e)=>{
    setEmail(e.target.value)
  }
  const handleOnChangePw=(e)=>{
    setPw(e.target.value)
  }
  const handleOnChangeConfirmPw=(e)=>{
    setConfirmPw(e.target.value)
  }
  const mutation = useMutationHooks(
    data => UserService.signUpUser(data)
   )
   const {data,isPending,isSuccess,isError}=mutation
   useEffect(()=>{
      if(isSuccess){
        message.success('Đăng ký thành công')
        handleNavigateSignIn()
      }else if(isError){
        message.error('Đăng ký không thành công')
      }
   },[isSuccess,isError])
  const navigate=useNavigate()
  const handleNavigateSignIn=()=>{
    navigate('/sign-in')
  }
  const handleSignUp=()=>{
    mutation.mutate({
      email,
      password:pw,
      confirmPassword:confirmPw
    })
  }
  return (
    <ContainerSign>
     <WrapperSign>
        <h1 style={{fontSize:'24px'}}>Xin Chào</h1>
        <p style={{fontSize:'20px',color:'#555555'}}>Tạo tài khoản hoặc <a onClick={handleNavigateSignIn} style={{color:'#b61a1a',textDecoration:'none'}}href="">đăng nhập</a></p>
        <label style={{fontSize:'16px',color:'#222222'}} htmlFor="">Địa chỉ email *</label>
        <InputForm placeholder='Nhập tên tài khoản hoặc email...' value={email} onChange={handleOnChangeEmail}/>
        <label   style={{fontSize:'16px',color:'#222222'}} htmlFor="">Mật khẩu *</label>
        <InputForm type={isShowPw?'text':'password'} placeholder='Nhập mật khẩu...' value={pw} onChange={handleOnChangePw}/>
        <div style={{position:'relative',left:'96%',top:'-35px'}}>
            <div onClick={()=>{setIsShowPw(!isShowPw)}}style={{fontSize:'16px'}}>
              {!isShowPw?(<EyeOutlined/>):(<EyeInvisibleOutlined/>)}
            </div>
          </div>
        <label   style={{fontSize:'16px',color:'#222222'}} htmlFor="">Xác nhận mật khẩu *</label>
        <InputForm type={isShowConfirmPw?'text':'password'} placeholder='Nhập lại mật khẩu...'value={confirmPw} onChange={handleOnChangeConfirmPw}/>
        <div style={{position:'relative',left:'96%',top:'-35px'}}>
            <div onClick={()=>{setIsShowConfirmPw(!isShowConfirmPw)}}style={{fontSize:'16px'}}>
              {!isShowConfirmPw?(<EyeOutlined/>):(<EyeInvisibleOutlined/>)}
            </div>

          </div>
          {data?.status ==='ERR'&&<span style={{color:'red'}}>{data?.message}</span>}
        <div style={{display:'flex',justifyContent:'flex-end',alignItems:'end'}}>
        <LoadingComponent isLoading={isPending}>
          <ButtonComponent
           disabled={!email.length||!pw.length||!confirmPw.length}
           onClick={handleSignUp} 
           styleButton={{color:'#fff',backgroundColor:'#b61a1a',width:'150px'}} 
           textButton={'Đăng Ký'}/>
          </LoadingComponent>
          

        </div>
        
      </WrapperSign>

    </ContainerSign>
  )
}

export default SignUpPage