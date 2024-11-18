import axios from "axios";
export const axiosJWT = axios.create();
export const getAllSku = async () => {
  let res = {};

    res = await axios.get(`${process.env.REACT_APP_API_URL}/sku/getAllSKUs`)

  return res.data;
};
export const createSku = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/sku/createSKU`,
    data
  );
  return res.data;
};
export const getSKUById = async (id) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/sku/getSKUById/${id}`
  );
  return res.data;
};
export const getSKUByIdProduct = async (id) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/sku/getSKUByIdProduct/${id}`
  );
  return res.data;
};
export const updateSku = async (id, data) => {
  console.log('updateSku',data)
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API_URL}/sku/updateSKU/${id}`,
    data,
    // {
    //   headers: {
    //     token: `Bearer ${access_Token}`,
    //   },
    // }
  );
  return res.data;
};
export const deleteSku = async (id, access_Token) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_API_URL}/sku/deleteSKU/${id}`,
    {
      headers: {
        token: `Bearer ${access_Token}`,
      },
    }
  );
  return res.data;
};
// router.delete('/deleteSKUByIdProduct/:id', skuController.deleteAllSkusByProduct);
export const deleteSkuByIdProduct = async (id, access_Token) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_API_URL}/sku/deleteSkuByIdProduct/${id}`,
    {
      headers: {
        token: `Bearer ${access_Token}`,
      },
    }
  );
  return res.data;
};

export const findMatchingSku = async (productId, options) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/sku/findSkuByOption`, {
      productId,
      options, // ví dụ: { Color: "Red", Size: "M" }
    });
    return response.data; // SKU phù hợp
  } catch (error) {
    console.error('Không tìm thấy SKU phù hợp:', error);
  }
};
export const getProductDiscountBySku = async (id) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/sku/getProductDiscountBySku/${id}`
  );
  return res.data;
};