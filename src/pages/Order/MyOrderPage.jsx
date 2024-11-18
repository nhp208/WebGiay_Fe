import React, { useEffect, useState } from "react";
import { Table, Button, Card, Typography, Tag } from "antd";
import * as OrderService from "../../services/OrderService"; // Giả sử đây là hàm gọi API lấy danh sách đơn hàng
import { useSelector } from "react-redux";
import OrderDetailModal from "./OrderDetailModal";
const { Title } = Typography;

const MyOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null); // State để lưu trữ đơn hàng đang xem chi tiết
  const [isDrawerVisible, setIsDrawerVisible] = useState(false); // State để điều khiển Drawer
  const user = useSelector((state) => state.user);

  useEffect(() => {
    // Lấy danh sách đơn hàng từ API
    const fetchOrders = async () => {
      try {
        const response = await OrderService.getUserOrders(user?.id); // Giả sử đây là API lấy danh sách đơn hàng của người dùng
        setOrders(response);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách đơn hàng:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user?.id]);

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "_id",
      key: "id",
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
          {status?status:'Chờ xác nhận'}
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
      title: "Chi tiết",
      key: "action",
      render: (text, record) => (
        record.status !== "hủy" ? (
          <Button type="link" onClick={() => viewOrderDetails(record)}>
            Xem chi tiết
          </Button>
        ) : (
          <Button type="link" disabled>
            Đơn hàng đã hủy
          </Button>
        )
      ),
    },
  ];

  // Tạo hàm để xử lý xem chi tiết đơn hàng
  const viewOrderDetails = (order) => {
    setSelectedOrder(order); // Lưu đơn hàng đã chọn vào state
    setIsDrawerVisible(true); // Hiển thị Drawer
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
    setSelectedOrder(null); // Đặt lại đơn hàng khi đóng Drawer
  };

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>Đơn Hàng Của Tôi</Title>
      <Card>
        <Table
          dataSource={orders}
          columns={columns}
          rowKey="_id"
          loading={loading}
          pagination={{ pageSize: 5 }}
          rowClassName={(record) => record.status === "hủy" ? "highlight-row" : ""}
        />
      </Card>
      <OrderDetailModal
        order={selectedOrder}
        visible={isDrawerVisible}
        onClose={closeDrawer}
      />

      {/* CSS nội tuyến */}
      <style jsx>{`
        /* Tô đậm các đơn hàng có trạng thái 'hủy' */
        .highlight-row {
          font-weight: bold;
          background-color: #f8d7da; /* Màu nền nhạt cho đơn hàng hủy */
        }
      `}</style>
    </div>
  );
};

export default MyOrderPage;
