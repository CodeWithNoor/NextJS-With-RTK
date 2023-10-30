import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice";
import ProductReducer from "./ProductSlice";
import TodoReducer from "./TodoSlice"
import { todoAPI } from "./TodoSlice";
import { userAPI } from "./UserAuthSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import UserReducer from "./UserAuthSlice";
import LoginReducer from "./LoginSlice";
import { loginUserAPI } from "./LoginSlice";


export const store = configureStore({
    reducer: {
        userData: userReducer,
        productData: ProductReducer,
        todoData: TodoReducer,
        userAuthData: UserReducer,
        loginData: LoginReducer,
        [todoAPI.reducerPath]: todoAPI.reducer,
        [userAPI.reducerPath]: userAPI.reducer,
        [loginUserAPI.reducerPath]: loginUserAPI.reducer,
    },

    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todoAPI.middleware),

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todoAPI.middleware, userAPI.middleware, loginUserAPI.middleware),
});
setupListeners(store.dispatch)