export const cartMiddleware = store => next => action => {
    const result = next(action);
    
    // Lưu vào localStorage khi có thay đổi trong order
    if (action.type?.startsWith('order/')) {
        const state = store.getState();
        localStorage.setItem('userCarts', JSON.stringify(state.order.orders));
    }
    
    return result;
};