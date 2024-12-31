import React, { useEffect, useRef, useState } from "react";
import { WrapperHeader, WrapperUploadFile } from "./style";
import { Button, Checkbox, Form, Input, Modal, Space } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleFilled,
  SearchOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";

import TableComponent from "../Table/TableComponent";
import { getBase64 } from "../../utils";
import * as UserService from "../../services/UserService.js";
import { useMutationHooks } from "../../hooks/useMutation";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import * as message from "../../components/Message/Message.jsx";
import { useQuery } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import DrawerComponnent from "../Drawer/DrawerComponnent.jsx";
import { useSelector } from "react-redux";
import ModalComponent from "../Modal/ModalComponent.jsx";
function AdminUserComponent() {
  const [isLoadingAll, setIsLoadingAll] = useState(false);
  const user = useSelector((state) => state?.user);
  const [stateUser, setStateUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    avatar: "",
  });
  const [formCreate] = Form.useForm();
  const [formDetail] = Form.useForm();
  const getAllusers = async () => {
    const res = await UserService.getAllUser(user?.access_Token);
    return res;
  };
  const queryUser = useQuery({
    queryKey: ["users"],
    queryFn: getAllusers,
  });
  const { isLoading: isLoadingUsers, data: Users } = queryUser;
  const handleOnChange = (e) => {
    setStateUser({
      ...stateUser,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnChangeImage = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateUser({
      ...stateUser,
      avatar: file.preview,
    });
  };
// Tạo user mới
  const mutationCreate = useMutationHooks((data) => {
    const { name, email, phone, address, avatar,password,confirmPassword } = data;
    const res = UserService.signUpUser({
      name, email, phone, address, avatar,password,confirmPassword 
    });
    return res;
  });
  const onFinish = () => {
    mutationCreate.mutate(stateUser, {
      onSettled: () => {
        queryUser.refetch();
      },
    });
  };
  const { data:dataCreate, isPending:isPendingCreate, isSuccess:isSuccessCreate, isError:isErrorCreate } = mutationCreate;
  useEffect(() => {
    if (isSuccessCreate) {
      if (dataCreate?.status === "OK") {
        message.success('Tạo người dùng mới thành công');
        handleCancel();
      } else {
        message.error('Tạo người dùng thất bại');
      }
    } else if (isErrorCreate) {
      message.error('Tạo người dùng thất bại');
    }
  }, [isSuccessCreate, isErrorCreate, dataCreate]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    onFinish();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setStateUser({
      name: "",
      email: "",
      phone: "",
      address: "",
      avatar: "",
      password:"",
      confirmPassword:"",
    });
    formCreate.resetFields();
  };
  const validateConfirmPassword = ({ getFieldValue }) => ({
    validator(_, value) {
      if (value && value !== getFieldValue('password')) {
        return Promise.reject(new Error('Passwords do not match!'));
      }
      return Promise.resolve();
    },
  });
   // Import dữ liệu vào table
  const [searchText, setSearchText] = useState('');
  const [searchedStatus, setSearchedStatus] = useState('');
  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined
          style={{
            cursor: "pointer",
            color: "red",
            fontSize: "20px",
            margin: "8px",
          }}
          onClick={() => setIsModalDeleteOpen(true)}
        />
        <EditOutlined
          style={{
            cursor: "pointer",
            color: "#898950",
            fontSize: "20px",
            margin: "8px",
          }}
          onClick={handleDetailsUser}
        />
      </div>
    );
  };
  const dataUser = Users?.data?.map((user) => {
    return { ...user, key: user._id };
  });
  console.log(dataUser)
  const [searchName, setSearchName] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [searchPhone, setSearchPhone] = useState('');
  const columns = [
    {
      title: "Tên người dùng",
      dataIndex: "name",
      filteredValue: [searchName],
      onFilter: (value, record) => {
        return String(record.name).toLowerCase().includes(value.toLowerCase())
      }
    },
    {
      title: "Email",
      dataIndex: "email",
      filteredValue: [searchEmail],
      onFilter: (value, record) => {
        return String(record.email).toLowerCase().includes(value.toLowerCase())
      }
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      filteredValue: [searchPhone],
      onFilter: (value, record) => {
        return String(record.phone).toLowerCase().includes(value.toLowerCase())
      }
    },
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      render: (text) => {
        if(text){
        return <img src={text} alt="profile" style={{ width: 50, height: 50 ,borderRadius:'50%'}}/>
        }
      },
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: renderAction,
    },
  ];
  //Update
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [rowSelected, setRowSelected] = useState("");
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [stateUserDetails, setStateUserDetails] = useState({
    name: "",
    // password:'',
    email: "",
    phone: "",
    address: "",
    avatar: "",
  });
  const fetchGetDetailsUser = async (rowSelected) => {
    const res = await UserService.getDetailsUser(rowSelected,user?.access_Token);
    if (res?.data) {
      setStateUserDetails({
        name: res?.data?.name,
        email: res?.data?.email,
        // password: res?.data?.password,
        phone: res?.data?.phone,
        address: res?.data?.address,
        avatar: res?.data?.avatar,
      });
    }
    console.log('StateUserDetails')
    setIsLoadingUpdate(false);
  };
  useEffect(() => {
    formDetail.setFieldsValue(stateUserDetails);
  }, [formDetail, stateUserDetails]);
  useEffect(() => {
    if (rowSelected) {
      setIsLoadingUpdate(true);
      fetchGetDetailsUser(rowSelected);
    }
  }, [rowSelected]);

  const handleDetailsUser = () => {
    setIsOpenDrawer(true);
  };
  const handleOnChangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnChangeImageDetails = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateUserDetails({
      ...stateUserDetails,
      avatar: file.preview,
    });
  };
  const onUpdateUser = () => {
    mutationUpdate.mutate(
      {
        rowSelected,
        token: user?.access_Token,
        ...stateUserDetails,
      },
      {
        onSettled: () => {
          queryUser.refetch();
        },
      }
    );
    setIsOpenDrawer(false);
  };
  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateUserDetails({
      name: "",
      email: "",
      phone: "",
      address: "",
      avatar: "",
    });
    formCreate.resetFields();
  };

  const mutationUpdate = useMutationHooks((data) => {
    const { rowSelected, token, ...stateUserDetails } = data;
    const res = UserService.updateUser(rowSelected, token, {
      ...stateUserDetails,
    });
    return res;
  });
  const {
    data: dataUpdated,
    isPending: isPendingUpdated,
    isSuccess: isSuccessUpdated,
    isError: isErrorUpdated,
  } = mutationUpdate;
  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === "OK") {
      message.success("Cập nhật người dùng thành công");
      handleCloseDrawer();
    } else if (isErrorUpdated) {
      message.error("Cập nhật người dùng thất bại");
    }
  }, [isSuccessUpdated]);
  // Delete User
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const handleCancelDelete = () => {
    setIsModalDeleteOpen(false);
  };

  // useEffect(()=>{
  //   if(isSuccessDeleted&&dataDeleted?.status==='OK'){
  //     message.success('Xóa người dùng thành công')
  //     handleCancelDelete();
  //   }else if(isErrorDeleted){
  //     message.error('Xóa người dùng thất bại')
  //   }
  // })
  const mutationDelete = useMutationHooks((data) => {
    const { id, token } = data;
    const res = UserService.deleteUser(id, token);
    return res;
  });

  const handleDeleteUser = () => {
    mutationDelete.mutate(
      { id: rowSelected, token: user?.access_Token },
      {
        onSettled: () => {
          queryUser.refetch();
        },
      }
    );
    if (isSuccessDeleted) {
      if( dataDeleted?.status === "OK"){
        message.success("Xóa người dùng thành công");
        handleCancelDelete();
      }
      else{
      message.error("Xóa người dùng thất bại");
      }
    } else if (isErrorDeleted) {
      message.error("Xóa người dùng thất bại");
    }
  };
  const {
    data: dataDeleted,
    isPending: isPendingDeleted,
    isSuccess: isSuccessDeleted,
    isError: isErrorDeleted,
  } = mutationDelete;
  //delete Many
  const mutationDeleteMany = useMutationHooks((dataUser) => {
    const { ids, token } = dataUser;
    const res = UserService.deleteManyUser(ids, token);
    return res;
  });
  const handleDeleteManyUsers = (ids)=>{
    mutationDeleteMany.mutate({ids:ids,token: user?.access_Token},{
      onSettled:()=>{
        queryUser.refetch();
      }
    })
    if(isSuccessDeletedMany&&dataDeletedMany?.status==='OK'){
      message.success('Xóa người dùng thành công')
      handleCancelDelete();
    }else if(isErrorDeletedMany){
      message.error('Xóa người dùng thất bại')
    }
  }
  const {
    data: dataDeletedMany,
    isPending: isPendingDeletedMany,
    isSuccess: isSuccessDeletedMany,
    isError: isErrorDeletedMany,
  } = mutationDeleteMany;
  //Giao Dien
  return (
    <div>
      <WrapperHeader>Quản lý người dùng</WrapperHeader>
      <div style={{ marginTop: "10px" }}>
        <Button
            onClick={showModal}
          style={{
            height: "150px",
            width: "150px",
            borderRadius: "6px",
            borderStyle: "dashed",
          }}
        >
          <PlusCircleFilled style={{ fontSize: "60px" }} />
        </Button>
      </div>
      <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
        <Input.Search
          placeholder="Tìm kiếm theo tên..."
          onSearch={(value) => {
            setSearchName(value)
          }}
          onChange={(e) => {
            setSearchName(e.target.value)
          }}
          style={{ width: '20%' }}
        />
        <Input.Search
          placeholder="Tìm kiếm theo email..."
          onSearch={(value) => {
            setSearchEmail(value)
          }}
          onChange={(e) => {
            setSearchEmail(e.target.value)
          }}
          style={{ width: '20%' }}
        />
        <Input.Search
          placeholder="Tìm kiếm theo số điện thoại..."
          onSearch={(value) => {
            setSearchPhone(value)
          }}
          onChange={(e) => {
            setSearchPhone(e.target.value)
          }}
          style={{ width: '20%' }}
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        <TableComponent
          columns={columns}
          data={dataUser}
          handleDeleteMany={handleDeleteManyUsers}
          selectionType={"checkbox"}
          pagination={{ pageSize: 4 }}
          onRow={(record, rowIndex) => ({
            onClick: () => setRowSelected(record._id)
          })}
        />
      </div>
     <ModalComponent
        forceRender
        title="Tạo người dùng mới"
        okText=""
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <LoadingComponent isLoading={isPendingCreate}>
          <Form
            form={formCreate}
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Tên người dùng"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Xin hãy nhập tên người dùng!",
                },
              ]}
            >
              <Input
                onChange={handleOnChange}
                name="name"
                value={stateUser.name}
              />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Xin hãy nhập email!",
                },
              ]}
            >
              <Input onChange={handleOnChange} name="email" />
            </Form.Item>
            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Xin hãy nhập Mật khẩu!",
                },
              ]}
            >
              <Input.Password onChange={handleOnChange} name="password" />
            </Form.Item>
            <Form.Item
              label="Nhập lại mật khẩu"
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  
                  message: "Xin hãy nhập lại mật khẩu!",
                },
                validateConfirmPassword(formCreate)
              ]}
            >
              <Input.Password onChange={handleOnChange} name="confirmPassword" />
            </Form.Item>
            <Form.Item
              label="Số điện thoại liên lạc"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Xin hãy nhập số điện thoại!",
                },
              ]}
            >
              <Input onChange={handleOnChange} name="phone" />
            </Form.Item>
            <Form.Item
              label="Địa chỉ"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Xin hãy nhập địa chỉ",
                },
              ]}
            >
              <Input onChange={handleOnChange} name="address" />
            </Form.Item>

            <Form.Item
              label="Ảnh đại diện"
              name="avatar"
              rules={[
                {
                  required: true,
                  message: "Xin hãy chọn ảnh đại diện!",
                },
              ]}
            >
              <WrapperUploadFile maxCount={1} onChange={handleOnChangeImage}>
                <Button icon={<UploadOutlined />}>Select File</Button>
                {stateUser?.avatar && (
                  <img
                    src={stateUser.avatar}
                    style={{
                      marginLeft: "24px",
                      height: "120px",
                      width: "120px",
                      borderRadius: "4%",
                      objectFit: "cover",
                    }}
                    alt="avatar"
                  />
                )}
              </WrapperUploadFile>
            </Form.Item>
            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            ></Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Tạo người dùng
              </Button>
            </Form.Item>
          </Form>
        </LoadingComponent>
      </ModalComponent>
      <DrawerComponnent
        title="Chi tiết người dùng"
        isOpen={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
      >
        <LoadingComponent isLoading={isLoadingUpdate}>
          <Form
            form={formDetail}
            name="basic"
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 20,
            }}
            style={{
              maxWidth: "80%",
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onUpdateUser}
            onFinishFailed={onFinishFailed}
            autoComplete="on"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Tên người dùng không được để trống!",
                },
              ]}
            >
              <Input
                onChange={handleOnChangeDetails}
                name="name"
                value={stateUserDetails.name}
              />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Email không được để trống!",
                },
              ]}
            >
              <Input
                onChange={handleOnChangeDetails}
                value={stateUserDetails.email}
                name="email"
              />
            </Form.Item>
            {/* <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Mật khẩu không được để trống!",
                },
              ]}
            >
              <Input.Password
                onChange={handleOnChangeDetails}
                name="password"
              />
            </Form.Item> */}
            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Số điện thoại không được để trống!",
                },
              ]}
            >
              <Input
                onChange={handleOnChangeDetails}
                value={stateUserDetails.phone}
                name="phone"
              />
            </Form.Item>
            <Form.Item
              label="Địa chỉ"
              name="address"
            >
              <Input
                onChange={handleOnChangeDetails}
                value={stateUserDetails.address}
                name="address"
              />
            </Form.Item>
            <Form.Item
              label="Ảnh đại diện"
              name="avatar"
              value={stateUserDetails.avatar}
            >
              <WrapperUploadFile
                maxCount={1}
                onChange={handleOnChangeImageDetails}
              >
                <Button icon={<UploadOutlined />}>Select File</Button>
                {stateUserDetails.avatar && (
                  <img
                    src={stateUserDetails.avatar}
                    style={{
                      marginLeft: "24px",
                      height: "120px",
                      width: "120px",
                      borderRadius: "4%",
                      objectFit: "cover",
                    }}
                    alt="avatar"
                  />
                )}
              </WrapperUploadFile>
            </Form.Item>
            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            ></Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Apply
              </Button>
            </Form.Item>
          </Form>
        </LoadingComponent>
      </DrawerComponnent>
      <ModalComponent
        title="Xóa sản phẩm"
        open={isModalDeleteOpen}
        onOk={handleDeleteUser}
        onCancel={handleCancelDelete}
      >
        <LoadingComponent isLoading={isPendingDeleted}>
          <div>Bạn có chắc muốn xóa sản phẩm</div>
        </LoadingComponent>
      </ModalComponent> 
    </div>
  );
}
export default AdminUserComponent;