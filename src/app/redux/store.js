import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice";
import ProductReducer from "./ProductSlice";
import TodoReducer from "./TodoSlice"

export const store = configureStore({
    reducer: {
        userData: userReducer,
        productData: ProductReducer,
        todoData: TodoReducer
    }
});