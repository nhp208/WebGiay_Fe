import axios from "axios";
export const axiosJWT = axios.create();
export const loginUser = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/user/sign-in`,
    data
  );
  return res.data;
};
export const signUpUser = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/user/sign-up`,
    data
  );
  return res.data;
};
export const getDetailsUser = async (id, access_Token) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API_URL}/user/get-details/${id}`,
    {
      headers: {
        token: `Bearer ${access_Token}`,
      },
    }
  );
  return res.data;
};
export const refreshToken = async () => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/user/refresh-token`,
    {
      withCredentials: true,
    }
  );
  return res.data;
};
export const logoutUser = async () => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/log-out`);
  return res.data;
};
export const updateUser = async (id, access_Token,data) => {
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API_URL}/user/update-user/${id}`,
    data,
    {
      headers: {
        token: `Bearer ${access_Token}`,
      },
    }
  );
  return res.data;
};
export const getAllUser = async (access_Token) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/user/getAll`,
    {
      headers: {
        token: `Bearer ${access_Token}`,
      },
    }
  );
  return res.data;
};
export const deleteUser = async (id, access_Token) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_API_URL}/user/delete-user/${id}`,
    {
      headers: {
        token: `Bearer ${access_Token}`,
      },
    }
  );
  return res.data;
};
export const deleteManyUser =async(ids,access_Token)=>{
  const res= await axiosJWT.post(`${process.env.REACT_APP_API_URL}/user/deleteMany`,ids,{
      headers: {
          token:`Bearer ${access_Token}`,
      }
  })
  return res.data
}