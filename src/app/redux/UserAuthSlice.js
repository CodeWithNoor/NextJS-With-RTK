import { createSlice, nanoid, AsyncThunk, current } from "@reduxjs/toolkit";
import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react"
// import axios from "axios";

const initialState = {
    user: [],
}

export const fetchUserApi = createAsyncThunk("action", async () => {
    console.log("fetching data")
    const data = await fetch("http://localhost:3000/api/user/signup/")
    const user = await data.json()
    console.log("user", user)
    return user.message
})

export const userAPI = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/api/user/signup/"
    }),
    tagTypes: ['Post', 'Get'],
    endpoints: (builder) => ({
        createAPI: builder.mutation({
            query: (body) => ({
                url: "http://localhost:3000/api/user/signup/",
                method: "POST",
                body,
            }),
            invalidatesTags: [{ type: 'Post' }],
        })
    })
})

export const { useCreateAPIMutation } = userAPI

const userSlice = createSlice({
    name: "userauth",
    initialState,
    reducers: {
        addUser: (state, action) => {
            const signinUser = {
                id: nanoid(),
                payload: action.payload,
            }
            state.user.push(signinUser);
            const user_auth = current(state.user)
            console.log("user_auth", user_auth)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserApi.fulfilled, (state, action) => {
            console.log("action", action)
            state.user = action.payload
        })
    }
})

export const { addUser } = userSlice.actions;
export default userSlice.reducer

