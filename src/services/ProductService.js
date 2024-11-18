import axios from "axios";
export const axiosJWT = axios.create();
export const getAllProductAdmin = async (limit, page, search = "") => {
  const params = new URLSearchParams();

  // Thêm tham số phân trang
  if (limit) params.append("limit", limit);
  if (page) params.append("page", page);

  // Thêm tham số filter
  if (search) {
    params.append("filter", "name"); // Đặt filter theo tên
    params.append("filter", search); // Giá trị tìm kiếm
  }

  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/product/get-all?${params.toString()}`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi
  }
};

export const createProduct = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/product/create`,
    data
  );
  return res.data;
};
export const getDetailsProduct = async (id) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/product/details/${id}`
  );
  return res.data;
};
export const updateProduct = async (id, access_Token, data) => {
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API_URL}/product/update/${id}`,
    data,
    {
      headers: {
        token: `Bearer ${access_Token}`,
      },
    }
  );
  return res.data;
};
export const deleteProduct = async (id, access_Token) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_API_URL}/product/delete/${id}`,
    {
      headers: {
        token: `Bearer ${access_Token}`,
      },
    }
  );
  return res.data;
};
export const deleteManyProduct = async (ids, access_Token) => {

  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_URL}/product/deleteMany`,
    ids,
    {
      headers: {
        token: `Bearer ${access_Token}`,
      },
    }
  );
  return res.data;
};
export const getAllTypeProduct = async () => {
  let res = {};
  res = await axios.get(
    `${process.env.REACT_APP_API_URL}/product/get-all-type`
  );

  return res.data;
};
export const getAllBrandNameProduct = async () => {
  let res = {};
  res = await axios.get(
    `${process.env.REACT_APP_API_URL}/product/get-all-brandName`
  );

  return res.data;
};
export const getAllProductByType = async (type) => {
  let res = {};
 if(type){
  res = await axios.get(
    `${process.env.REACT_APP_API_URL}/product/get-all/?filter=type&filter=${type}`
  );

  return res.data;
 }
  
};

export const searchProducts = async (params) => {
  try {
    const queryString = new URLSearchParams();
    
    // Thêm các params vào query string
    Object.entries(params).forEach(([key, value]) => {
      queryString.append(key, value);
    });

    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/product/search?${queryString.toString()}`
    );
    return res.data;
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};

export const getAllProduct = async (params) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all?${queryString}`);
    return response.data;
  } catch (error) {
    console.error('Error getting products:', error);
    throw error;
  }
};
