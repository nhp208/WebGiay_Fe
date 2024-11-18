import axios from 'axios';

// Lấy tất cả địa chỉ giao hàng của một user
export const getShippingAddressesByUser = async (userId) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/shippingAddress/getShippingAddressByUser/${userId}`);
    return response.data; // Trả về danh sách địa chỉ giao hàng
  } catch (error) {
    console.error('Error fetching shipping addresses:', error);
    throw new Error('Không thể lấy danh sách địa chỉ giao hàng.');
  }
};

// Tạo một địa chỉ giao hàng mới cho user
export const createShippingAddress = async (userId, shippingAddressData) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/shippingAddress/createShippingAddress/${userId}`,
      shippingAddressData
    );
    return response.data; // Trả về địa chỉ giao hàng đã được tạo
  } catch (error) {
    console.error('Error creating shipping address:', error);
    throw new Error('Không thể tạo địa chỉ giao hàng mới.');
  }
};

// Lấy địa chỉ giao hàng theo id
export const getShippingAddressById = async (addressId) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/shippingAddress/${addressId}`);
    return response.data; // Trả về thông tin địa chỉ giao hàng
  } catch (error) {
    console.error('Error fetching shipping address:', error);
    throw new Error('Không thể lấy thông tin địa chỉ giao hàng.');
  }
};
