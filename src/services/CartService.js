import axios from 'axios';

const API_URL = '/api/cart';

export const getCart = async () => {
  return await axios.get(API_URL);
};

export const addToCart = async (orderItem) => {
  return await axios.post(`${API_URL}/add`, orderItem);
};

export const updateCartItem = async ({ productId, sku, amount }) => {
  return await axios.put(`${API_URL}/update`, {
    productId,
    sku,
    amount
  });
};

export const removeFromCart = async (productId, sku) => {
  return await axios.delete(`${API_URL}/remove/${productId}/${sku}`);
};

export const clearCart = async () => {
  return await axios.delete(`${API_URL}/clear`);
};