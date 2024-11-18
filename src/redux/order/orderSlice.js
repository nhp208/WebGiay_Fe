import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderItems: [],
  shippingAddress: "",
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalDiscounted:0,
  totalPrice: 0,
  user: "",
  paymentMethod: "",
  isPaid: false,
  paidAt: "",
  isDelivered: false,
  deliverAt: "",
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrderProduct: (state, action) => {
      const { orderItem } = action.payload;
      const itemOrder = state?.orderItems?.find(
        (item) =>
          item?.product === orderItem.product && item?.sku === orderItem.sku
      );
      if (itemOrder) {
        itemOrder.amount += orderItem?.amount;
      } else {
        state.orderItems.push(orderItem);
      }
    },
    setAmountProduct: (state, action) => {
      const { product, sku, quantity } = action.payload;
      const itemOrder = state?.orderItems?.find(
        (item) => item?.product === product && item?.sku === sku
      );
      if (itemOrder) {
        itemOrder.amount = quantity;
      }
    },
    removeOrderProduct: (state, action) => {
      const { product, sku } = action.payload;
      state.orderItems = state.orderItems.filter(
        (item) => !(item?.product === product && item?.sku === sku)
      );
    },
    removeAllOrder: (state) => {
      state.orderItems = [];
    },
  },
});

export const { addOrderProduct, removeOrderProduct, setAmountProduct, removeAllOrder } = orderSlice.actions;

export default orderSlice.reducer;
