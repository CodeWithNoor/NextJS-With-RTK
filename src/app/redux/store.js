import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice";
import ProductReducer from "./ProductSlice";
import TodoReducer from "./TodoSlice"
import { todoAPI } from "./TodoSlice";
import { setupListeners } from "@reduxjs/toolkit/query";


export const store = configureStore({
    reducer: {
        userData: userReducer,
        productData: ProductReducer,
        todoData: TodoReducer,
        [todoAPI.reducerPath]: todoAPI.reducer
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todoAPI.middleware)
});
    setupListeners(store.dispatch)