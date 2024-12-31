import { createSlice } from '@reduxjs/toolkit';
import { createUserCart, addToCart } from '../order/orderSlice';

const initialState = {
    user: null,
    loading: false,
    error: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.error = null;
        }
    }
});

export const { setUser, setLoading, setError, logout } = authSlice.actions;

// Thunk action để xử lý đăng nhập
export const loginSuccess = (user) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        dispatch(setUser(user));
        
        // Khôi phục giỏ hàng từ localStorage
        const savedCarts = localStorage.getItem('userCarts');
        if (savedCarts) {
            const carts = JSON.parse(savedCarts);
            const userCart = carts.find(cart => cart.userId === user.id);
            if (userCart) {
                dispatch(createUserCart({ userId: user.id }));
                userCart.orderItems.forEach(item => {
                    dispatch(addToCart({ userId: user.id, product: item }));
                });
            }
        }
        
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setError(error.message));
        dispatch(setLoading(false));
    }
};

export const logoutUser = () => (dispatch) => {
    // Xóa giỏ hàng khỏi localStorage
    localStorage.removeItem('userCarts');
    // Dispatch action logout
    dispatch(logout());
};

export default authSlice.reducer;