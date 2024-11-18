import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  email: "",
  phone: "",
  address: "",
  avatar: "",
  access_Token: "",
  isAdmin:false
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const {
        name = "",
        email = "",
        access_Token = "",
        phone = "",
        address = "",
        avatar = "",
        _id = "",
        isAdmin
      } = action.payload;
      state.id = _id;
      state.name = name;
      state.email = email;
      state.phone = phone;
      state.address = address;
      state.avatar = avatar;
      state.access_Token = access_Token;
      state.isAdmin=isAdmin
    },
    updateUserName: (state, action) => {
      state.name = action.payload;
    },
    resetUser: (state) => {
      state.id = "";
      state.name = "";
      state.email = "";
      state.phone = "";
      state.address = "";
      state.avatar = "";
      state.access_Token = "";
      state.isAdmin=false
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
