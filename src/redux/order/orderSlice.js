import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orders: [], // Mảng chứa orders của các users

};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    
    reducers: {
        // Tạo giỏ hàng mới cho user
        createUserCart: (state, action) => {
            if (!Array.isArray(state.orders)) {
                state = {
                    orders: []
                };
            }
            
            const { userId } = action.payload;
            if (!state.orders.find(order => order.userId === userId)) {
                state.orders.push({
                    userId,
                    orderItems: [],
                    itemsPrice: 0,
                    taxPrice: 0,
                    shippingPrice: 0,
                    totalPrice: 0,
                    totalDiscounted: 0
                });
            }
        },
        
        // Cập nhật số lượng sản phẩm
        setAmountProduct: (state, action) => {
            if (!Array.isArray(state.orders)) {
                state.orders = [];
                return;
            }
            const { userId, product, sku, quantity } = action.payload;
            const userOrder = state.orders.find(order => order.userId === userId);
            if (userOrder) {
                const item = userOrder.orderItems.find(
                    item => item.product === product && item.sku === sku
                );
                if (item) {
                    item.amount = quantity;
                }
            }
        },

        // Thêm sản phẩm vào giỏ hàng
        addToCart: (state, action) => {
            const { userId, product } = action.payload;
            
            if (!userId) {
                console.log("userId", userId);
                console.error('userId is required for addToCart action');
                return;
            }
            
            // Tìm order của user
            let userOrder = state.orders.find(order => order.userId === userId);
            
            // Nếu chưa có order của user thì tạo mới
            if (!userOrder) {
                userOrder = {
                    userId: userId,
                    orderItems: [],
                    itemsPrice: 0,
                    shippingPrice: 0,
                    taxPrice: 0,
                    totalPrice: 0,
                    totalDiscounted: 0
                };
                state.orders.push(userOrder);
            }

            // Kiểm tra sản phẩm đã tồn tại trong giỏ hàng chưa
            const existingItem = userOrder.orderItems.find(
                item => item.product === product.product && item.sku === product.sku
            );

            if (existingItem) {
                // Nếu đã tồn tại, cập nhật số lượng
                existingItem.amount += product.amount;
            } else {
                // Nếu chưa tồn tại, thêm mới vào orderItems
                userOrder.orderItems.push(product);
            }

            // Tính toán lại tổng giá
            userOrder.itemsPrice = userOrder.orderItems.reduce(
                (total, item) => total + item.price * item.amount,
                0
            );
            userOrder.totalPrice = userOrder.itemsPrice + userOrder.shippingPrice + userOrder.taxPrice;
            userOrder.totalDiscounted = userOrder.orderItems.reduce(
                (total, item) => total + ((item.originalPrice - item.price) * item.amount),
                0
            );
        },

        // Xóa sản phẩm khỏi giỏ hàng
        removeFromCart: (state, action) => {
            if (!Array.isArray(state.orders)) {
                state.orders = [];
                return;
            }
            const { userId, productId, sku } = action.payload;
            const userOrder = state.orders.find(order => order.userId === userId);
            if (userOrder) {
                userOrder.orderItems = userOrder.orderItems.filter(
                    item => !(item.product === productId && item.sku === sku)
                );
            }
        },

        removeOrderProduct: (state, action) => {
            if (!Array.isArray(state.orders)) {
                state.orders = [];
                return;
            }
            const { userId, product, sku } = action.payload;
            const userOrder = state.orders.find(order => order.userId === userId);
            if (userOrder) {
                userOrder.orderItems = userOrder.orderItems.filter(
                    item => !(item.product === product && item.sku === sku)
                );
            }
        },

        removeAllOrder: (state, action) => {
            const { userId } = action.payload;
            state.orders = state.orders.filter(order => order.userId !== userId);
        },

        updateOrderTotals: (state, action) => {
            const { userId, totals } = action.payload;
            const userOrder = state.orders.find(order => order.userId === userId);
            if (userOrder) {
                Object.assign(userOrder, totals);
            }
        }
    }
});

export const { 
    createUserCart, 
    setAmountProduct, 
    addToCart, 
    removeFromCart, 
    removeOrderProduct, 
    removeAllOrder, 
    updateOrderTotals 
} = orderSlice.actions;

export default orderSlice.reducer;
