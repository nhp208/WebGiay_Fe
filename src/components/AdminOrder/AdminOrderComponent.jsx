import React, { useEffect, useState } from "react";
import { Table, Button, Space, Tag, Input, Select } from "antd";
import { getAllOrders, updateOrder } from "../../services/OrderService"; // Import hàm getAllOrders
import OrderDetailModal from "../../pages/Order/OrderDetailModal";
import { 
  WrapperHeader, 
  WrapperContainer,
  WrapperItemOrder,
  // ... other imports
} from './style';

const AdminOrderComponent = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

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

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleStatusFilter = (value) => {
    setStatusFilter(value);
  };

  const filteredOrders = orders.filter(order => {
    const matchSearch = order._id.toLowerCase().includes(searchText.toLowerCase());
    const matchStatus = !statusFilter || 
      (statusFilter === "chờ xác nhận" ? !order.status : order.status === statusFilter);
    return matchSearch && matchStatus;
  });

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
      render: (status) => {
        let color = 'default';
        let text = status || "chờ xác nhận";
        
        switch(text) {
          case "chờ xác nhận":
            color = 'gray';
            break;
          case "đang xử lý":
            color = 'processing';
            break;
          case "đang giao":
            color = 'blue';
            break;
          case "đã giao":
            color = 'green';
            break;
          case "đã hoàn thành":
            color = 'success';
            break;
          case "hủy":
            color = 'error';
            break;
          default:
            color = 'default';
        }
        
        return <Tag color={color}>{text}</Tag>;
      },
      filters: [
        { text: 'Chờ xác nhận', value: 'chờ xác nhận' },
        { text: 'Đang xử lý', value: 'đang xử lý' },
        { text: 'Đang giao', value: 'đang giao' },
        { text: 'Đã giao', value: 'đã giao' },
        { text: 'Đã hoàn thành', value: 'đã hoàn thành' },
        { text: 'Hủy', value: 'hủy' }
      ],
      onFilter: (value, record) => {
        if (value === "chờ xác nhận") {
          return !record.status;
        }
        return record.status === value;
      },
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
      <WrapperHeader>Quản Lý Đơn Hàng</WrapperHeader>
      
      <Space style={{ marginBottom: 16 }}>
        <Input.Search
          placeholder="Tìm kiếm theo mã đơn hàng"
          allowClear
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: 300 }}
        />
        
        <Select
          style={{ width: 200 }}
          placeholder="Lọc theo trạng thái"
          allowClear
          onChange={handleStatusFilter}
        >
          <Select.Option value="chờ xác nhận">Chờ xác nhận</Select.Option>
          <Select.Option value="đang xử lý">Đang xử lý</Select.Option>
          <Select.Option value="đang giao">Đang giao</Select.Option>
          <Select.Option value="đã giao">Đã giao</Select.Option>
          <Select.Option value="đã hoàn thành">Đã hoàn thành</Select.Option>
          <Select.Option value="hủy">Hủy</Select.Option>
        </Select>
      </Space>

      <Table
        columns={columns}
        dataSource={filteredOrders}
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
