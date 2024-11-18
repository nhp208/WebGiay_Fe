import { combineReducers, configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter/counterSlice'
import userReducer from './user/userSlice'
import productReducer from './product/productSlice'
import orderReducer from './order/orderSlice'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}
const rootReducer=combineReducers({
  counter: counterReducer,
  user:userReducer,
  product:productReducer,
  order:orderReducer,
})
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
  reducer:persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})
export let persistor = persistStore(store)