// src/services/OrderService.js
import axios from 'axios';

export const createOrder = async (orderData) => {
  try {
    // Gửi yêu cầu POST đến API backend
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/order/CreateOrder`, orderData);
    
    // Trả về dữ liệu từ backend (đơn hàng đã được tạo)
    return response.data;
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error('Error creating order:', error);
    throw new Error('Không thể tạo đơn hàng, vui lòng thử lại.');
  }
};
export const getUserOrders = async (id) => {
  try {
    // Gửi yêu cầu POST đến API backend
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/order/getUserOrders/${id}`);
    
    // Trả về dữ liệu từ backend (đơn hàng đã được tạo)
    return response.data;
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error('Error getting order:', error);
    throw new Error('Không thể lấy ra đơn hang của user');
  }
};
export const getAllOrders = async () => {
  try {
    // Gửi yêu cầu GET đến API backend để lấy tất cả đơn hàng
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/order/getAllOrders`);
    
    // Trả về dữ liệu từ backend (tất cả đơn hàng)
    return response.data;
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error('Error getting all orders:', error);
    throw new Error('Không thể lấy ra tất cả đơn hàng');
  }
};

export const updateOrder = async (orderId, updatedData) => {
  try {
    // Gửi yêu cầu PUT đến API backend để cập nhật thông tin đơn hàng
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}/order/updateOrder/${orderId}`, // Địa chỉ endpoint API
      updatedData // Dữ liệu cần cập nhật (ví dụ: { status: "đang xử lý" })
    );
    
    // Trả về dữ liệu phản hồi từ API (thông tin đơn hàng đã được cập nhật)
    return response.data;
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error('Error updating order:', error);
    throw new Error('Không thể cập nhật đơn hàng');
  }
};