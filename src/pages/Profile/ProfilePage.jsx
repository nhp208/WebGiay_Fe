import React, { Fragment, useEffect, useState } from "react";
import {
  WrapperContentProfile,
  WrapperHeading,
  WrapperInput,
  WrapperLabel,
  WrapperUploadFile,
} from "./style";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutation";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import * as message from "../../components/Message/Message.jsx";
import { Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { getBase64 } from "../../utils";
import { updateUser } from "../../redux/user/userSlice.js";

function ProfilePage() {
  const user = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    setEmail(user?.email);
    setName(user?.name);
    setPhone(user?.phone);
    setAddress(user?.address);
    setAvatar(user?.avatar);
  }, [user]);

  const mutation = useMutationHooks((data) => {
    const { id, access_Token, ...rests } = data;
    console.log("rest",rests)
    UserService.updateUser(id, access_Token, rests);
  });
  const { data, isPending, isSuccess, isError } = mutation;
  const handleOnChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleOnChangeName = (e) => {
    setName(e.target.value);
  };
  const handleOnChangePhone = (e) => {
    setPhone(e.target.value);
  };
  const handleOnChangeAddress = (e) => {
    setAddress(e.target.value);
  };
  const handleOnChangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setAvatar(file.preview);
  };
  const handleGetDetailsUser = async (id,token)=>{
    const res =await UserService.getDetailsUser(id,token)
    dispatch(updateUser({...res?.data,access_Token: token}))
  }
  const handleUpdate = () => {
    console.log('phone',phone)
    mutation.mutate({
      id: user?.id,
      email:email,
      name:name,
      phone:phone,
      address:address,
      avatar:avatar,
      access_Token: user?.access_Token,
    });
    
  };
  useEffect(() => {
    if (isSuccess) {
      message.success("Cập nhật thành công");
      handleGetDetailsUser(user?.id,user?.access_Token)
    } else if (isError) {
      message.error("Cập nhật thất bại");
    }
  }, [isSuccess,isError]);
  
  return (
    <Fragment>
      <div style={{ 
        width: "1270px", 
        margin: "0 auto",
        minHeight: "500px",
        paddingBottom: "40px"
      }}>
        <WrapperHeading>Thông tin người dùng</WrapperHeading>
        <LoadingComponent isLoading={isPending}>
          <WrapperContentProfile>
            <WrapperInput>
              <WrapperLabel htmlFor="name">Họ Tên</WrapperLabel>
              <InputForm id="name" value={name} onChange={handleOnChangeName} />
            
            </WrapperInput>
            
            <WrapperInput>
              <WrapperLabel htmlFor="phone">Số điện thoại</WrapperLabel>
              <InputForm
                id="phone"
                value={phone}
                onChange={handleOnChangePhone}
              />
            
            </WrapperInput>
            <WrapperInput>
              <WrapperLabel htmlFor="address">Địa chỉ</WrapperLabel>
              <InputForm
                id="address"
                value={address}
                onChange={handleOnChangeAddress}
              />
            
            </WrapperInput>
            <WrapperInput>
              <WrapperLabel htmlFor="avatar">Ảnh đại diện</WrapperLabel>
              <WrapperUploadFile maxCount={1} onChange={handleOnChangeAvatar}>
                <Button icon={<UploadOutlined />}>Select File</Button>
              </WrapperUploadFile>
              {avatar && (
                <img
                  src={avatar}
                  style={{
                    height: "60px",
                    width: "60px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                  alt="avatar"
                />
              )}
            
            </WrapperInput>
            <ButtonComponent onClick={handleUpdate} textButton={"Cập Nhật"} />

          </WrapperContentProfile>
        </LoadingComponent>
      </div>
    </Fragment>
  );
}

export default ProfilePage;
