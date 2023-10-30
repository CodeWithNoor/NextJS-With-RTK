import { createSlice } from "@reduxjs/toolkit";
import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react"


export const userLoginAPI = createAsyncThunk("action", async () => {
    const data = await fetch("http://localhost:3000/api/user/login/")
    const user = await data.json()
    console.log("user", user)
    return user.message
})

export const loginUserAPI = createApi({
    reducerPath: "loginAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/api/user/login/"
    }),
    tagTypes: ['Post', 'Put', 'Delete'],
    endpoints: (builder) => ({
        loginAPI: builder.mutation({
            query: (body) => ({
                url: "http://localhost:3000/api/user/login/",
                method: "POST",
                body,
            }),
            invalidatesTags: [{ type: 'Post' }],
        }),
        deleteLoginAPI: builder.mutation({
            query: (id) => ({
                url: `http://localhost:3000/api/user/login/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [{ type: 'Delete' }],
        }),
        updateLoginAPI: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `http://localhost:3000/api/user/login/${id}`,
                method: "PUT",
                body: patch,
            }),
            invalidatesTags: [{ type: 'Put' }],
        })
    })
})

export const { useLoginAPIMutation, useDeleteLoginAPIMutation, useUpdateLoginAPIMutation } = loginUserAPI

const userLoginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(userLoginAPI.fulfilled, (state, action) => {
            console.log("reducers", action)
            state.isLoading = false,
                state.user = action.payload
        })
    }
});

export default userLoginSlice.reducer