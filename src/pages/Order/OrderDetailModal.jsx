import React, { useEffect, useState } from "react";
import { Modal, Descriptions, Table, Space, Image, Typography, Select, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import * as ShippingAddressService from "../../services/ShippingAddressService";
const { Text } = Typography;

const OrderDetailModal = ({ order, visible, onClose, admin, handleUpdate }) => {
  const [newStatus, setNewStatus] = useState(order?.status || "");
  const [isEditing, setIsEditing] = useState(false); // State để điều khiển việc hiển thị Select
  const [shippingAddress, setShippingAddress] = useState(null);
  
  useEffect(() => {
    const fetchShippingAddress = async () => {
      if (!order || !order.shippingAddress) return;
      
      const res = await ShippingAddressService.getShippingAddressById(order.shippingAddress);
      return res.data;
    };  

    const getAddress = async () => {
      const res = await fetchShippingAddress();
      if (res) {
        setShippingAddress(res);
        console.log("shippingAddress", res);
      }
    };
    getAddress();
  }, [order?.shippingAddress, order]);

  if (!order) return null;

  // Cấu hình các cột cho bảng sản phẩm
  const productColumns = [
    {
      title: "Sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Space style={{ display: "flex", flexDirection: "column" }}>
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
      title: "Giảm giá",
      dataIndex: "discount",
      key: "discount",
      render: (discount) => `${discount}%`,
    },
    {
      title: "Số tiền giảm",
      key: "discountAmount",
      render: (text, record) => {
        const originalPrice = record.amount * record.price;
        const discountAmount = originalPrice * (record.discount / 100);
        return `-${discountAmount.toLocaleString()}₫`;
      },
    },
    {
      title: "Thành tiền sau giảm",
      key: "finalPrice", 
      render: (text, record) => {
        const originalPrice = record.amount * record.price;
        const finalPrice = originalPrice * (1 - record.discount / 100);
        return `${finalPrice.toLocaleString()}₫`;
      },
    },
  ];

  const handleStatusChange = (value) => {
    setNewStatus(value); // Cập nhật trạng thái khi chọn
  };

  const handleSaveStatus = () => {
    if (newStatus !== order.status) {
      // Call API to update the order status here
      console.log("Updating status to:", newStatus);
      message.success("Cập nhật trạng thái đơn hàng thành công!");
      handleUpdate(order,newStatus); // Gọi hàm cập nhật từ component cha
      setIsEditing(false); // Đóng Select sau khi lưu
    } else {
      message.warning("Trạng thái đơn hàng không thay đổi.");
    }
  };

  return (
    <Modal
      title={`Chi tiết đơn hàng: ${order._id}`}
      open={visible}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      <Descriptions column={1} bordered>
        <Descriptions.Item label="Mã đơn hàng">{order._id}</Descriptions.Item>
        <Descriptions.Item label="Ngày đặt">
          {new Date(order.createdAt).toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          })}
        </Descriptions.Item>
        <Descriptions.Item label="Trạng thái">
          {isEditing ? (
            <Select
              value={newStatus}
              style={{ width: 200 }}
              onChange={handleStatusChange}
              // disabled={newStatus === order.status} // Disable select if status is the same
            >
              <Select.Option value="chờ xác nhận">Chờ xác nhận</Select.Option>
              <Select.Option value="đang xử lý">Đang xử lý</Select.Option>
              <Select.Option value="đang xử lý">Đang giao hàng</Select.Option>
              <Select.Option value="đã giao">Đã giao</Select.Option>
              <Select.Option value="đã hoàn thành">Đã hoàn thành</Select.Option>
              <Select.Option value="hủy">Hủy</Select.Option>

            </Select>
          ) : (
            <>
              {order.status || "chờ xác nhận"}
              {admin && (
                <Space>
                  <EditOutlined
                    style={{
                      cursor: "pointer",
                      color: "#898950",
                      fontSize: "20px",
                      margin: "8px",
                    }}
                    onClick={() => setIsEditing(true)} // Bật chế độ sửa khi click vào EditOutlined
                  />
                </Space>
              )}
            </>
          )}
          {isEditing && (
            <button
              onClick={handleSaveStatus}
              style={{ marginLeft: 8 }}
            >
              Lưu
            </button>
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Tổng giá trị">
          {order.totalPrice.toLocaleString()}₫
        </Descriptions.Item>
        <Descriptions.Item label="Địa chỉ giao hàng">
          {order.shippingAddress && (
            <div>
              <div>{shippingAddress?.fullName}</div>
              <div>{shippingAddress?.address}</div>
              <div>{shippingAddress?.ward}</div>
              <div>{shippingAddress?.district}</div>
              <div>{shippingAddress?.city}</div>
              <div>{shippingAddress?.country}</div>
              <div>{shippingAddress?.phone}</div>
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
    </Modal>
  );
};

export default OrderDetailModal;
