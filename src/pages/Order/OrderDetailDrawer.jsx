// components/OrderDetailDrawer.js
import * as ShippingAddressService from "../../services/ShippingAddressService";
import React, { useState,useEffect } from "react";
import { Drawer, Descriptions, Table, Space, Image, Typography } from "antd";
const { Text } = Typography;

const OrderDetailDrawer = ({ order, visible, onClose }) => {
  const [shippingAddress, setShippingAddress] = useState(null);
  
  useEffect(() => {
    const fetchShippingAddress = async () => {
      const res = await ShippingAddressService.getShippingAddressesByUser(order.shippingAddress);
      return res.data;
    };  

    const getAddress = async () => {
      const res = await fetchShippingAddress();
      setShippingAddress(res);
    };
    getAddress();
    console.log("shippingAddress", shippingAddress);
  }, [order.shippingAddress,shippingAddress]);  

  // Cấu hình các cột cho bảng sản phẩm
  const productColumns = [
    {
      title: "Sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Space style={{display:'flex',flexDirection:'column'}}>
          <Image width={64} src={record.image} />
          <Text>{text}</Text>
        </Space>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price.toLocaleString()}₫`,
    },
    {
      title: "Thành tiền",
      key: "total",
      render: (text, record) => `${(record.amount * record.price).toLocaleString()}₫`,
    },
  ];

  return (
    <Drawer
      title={`Chi tiết đơn hàng: ${order._id}`}
      placement="right"
      width={400}
      onClose={onClose}
      visible={visible}
    >
      <Descriptions column={1} bordered>
        <Descriptions.Item label="Mã đơn hàng">{order._id}</Descriptions.Item>
        <Descriptions.Item label="Ngày đặt">
          {new Date(order.createdAt).toLocaleDateString()}
        </Descriptions.Item>
        <Descriptions.Item label="Trạng thái">{order.status?order.status:"chờ xác nhận"}</Descriptions.Item>
        <Descriptions.Item label="Tổng giá trị">
          {order.totalPrice.toLocaleString()}₫
        </Descriptions.Item>
        <Descriptions.Item label="Địa chỉ giao hàng">
          {order.shippingAddress && (
            <div>
              <div>{shippingAddress.fullName}</div>
              <div>{shippingAddress.address}</div>
              <div>{shippingAddress.city}</div>
              <div>{shippingAddress.country}</div>
              <div>{shippingAddress.phone}</div>
            </div>
          )}
        </Descriptions.Item>
      </Descriptions>

      {/* Bảng hiển thị sản phẩm trong đơn hàng */}
      <h3>Sản phẩm</h3>
      <Table
        dataSource={order.orderItems} // Giả sử order.orderItems là mảng chứa thông tin sản phẩm
        columns={productColumns}
        rowKey="_id"
        pagination={false}
      />
    </Drawer>
  );
};

export default OrderDetailDrawer;
