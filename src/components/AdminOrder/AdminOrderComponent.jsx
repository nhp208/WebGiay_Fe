import React, { useEffect, useState } from "react";
import { Table, Button, Space, Tag } from "antd";
import { getAllOrders, updateOrder } from "../../services/OrderService"; // Import hàm getAllOrders
import OrderDetailModal from "../../pages/Order/OrderDetailModal";

const AdminOrderComponent = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const data = await getAllOrders(); // Sử dụng getAllOrders để lấy tất cả đơn hàng
      setOrders(data);
    } catch (error) {
      console.error("Failed to load orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const showOrderDetail = (order) => {
    console.log('order',order)
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
  };

  // Cấu hình các cột cho bảng đơn hàng
  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Ngày đặt",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => new Date(createdAt).toLocaleDateString(),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "đã giao" ? "green" : status === "hủy" ? "red" : "orange"}>
        {status}
      </Tag>
      ),
    },
    {
      title: "Tổng giá trị",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (totalPrice) => `${totalPrice.toLocaleString()}₫`,
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => showOrderDetail(record)}>Chi tiết</Button>
        </Space>
      ),
    },
  ];

  
  const handleStatusChange = async (Order, newStatus) => {
    try {
      // Cập nhật trạng thái đơn hàng thông qua API
      await updateOrder(Order._id, {
        ...Order,
        status: newStatus,
      });
  
      // Cập nhật lại selectedOrder sau khi thay đổi trạng thái
      setSelectedOrder({
        ...Order,
        status: newStatus, // Cập nhật lại trạng thái trong selectedOrder
      });
  
      // Tải lại danh sách đơn hàng
      loadOrders();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };
  
  
  
  return (
    <div>
      <h2>Quản Lý Đơn Hàng</h2>
      <Table
        columns={columns}
        dataSource={orders}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          visible={isModalVisible}
          onClose={closeModal}
          admin={true}
          handleUpdate={handleStatusChange}
        />
      )}
    </div>
  );
};

export default AdminOrderComponent;
