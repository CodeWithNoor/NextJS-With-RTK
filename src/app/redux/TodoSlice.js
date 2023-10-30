const { createSlice, nanoid, current, createAsyncThunk } = require("@reduxjs/toolkit");
import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react"
import axios from "axios";


// createAsyncThunk ===> manage data fetching in RTK  
// createAsyncThunk ===> return a standard Redux thunk action creator (pending, fulfilled, rejected)
// createAsyncThunk ===> built-in function to handle promise-based logic and create the three action types that are always associated with async logic.

// export const fetchAPI = createAsyncThunk("action", async () => {
//     console.log("fetching data")
//     const data = await fetch("http://localhost:3000/api/todo")
//     const user = await data.json()
//     return user.message
// })

export const fetchAPIAxios = createAsyncThunk("action", async () => {
    console.log("fetching data from axios")
    const data = await axios.get("http://localhost:3000/api/todo")
    const user = await data.data.message
    return user
})


export const todoAPI = createApi({
    reducerPath: "todoApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/todo" }),
    tagTypes: ['Post', 'Delete', 'Put'],
    endpoints: (builder) => ({
        fetchAPI: builder.mutation({
            query: (body) => ({
                url: "http://localhost:3000/api/todo",
                method: "POST",
                body,
            }),
            invalidatesTags: [{ type: 'Post' }],
        }),
        deleteAPI: builder.mutation({
            query: (id) => ({
                url: `http://localhost:3000/api/todo/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [{ type: 'Delete' }],
        }),
        updateAPI: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `http://localhost:3000/api/todo/${id}`,
                method: 'PUT',
                body: patch,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Post', id }],
        }),
    })
})

export const { useFetchAPIMutation, useDeleteAPIMutation, useUpdateAPIMutation } = todoAPI
console.log("todoAPI", todoAPI)

const initialState = {
    fetchAPIinRTK: [],
    todos: JSON.parse(localStorage.getItem("task")) ? JSON.parse(localStorage.getItem("task")) : []
}


const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todoData = {
                id: nanoid(),
                payload: action.payload
            }
            state.todos.push(todoData)
            const userTodo = current(state.todos)
            console.log(userTodo)
            localStorage.setItem("task", JSON.stringify(userTodo))
        },
        removeTodo: (state, action) => {
            const data = state.todos.filter((item) => {
                return item.id !== action.payload
            });
            state.todos = data;
            localStorage.removeItem("task")
        },
        updateTodo: (state, action) => {
            const editData = state.todos.find((item) => {
                return item.id === action.payload
            })
            state.todos = editData
            // localStorage.setItem("task", JSON.stringify(editData))
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAPIAxios.fulfilled, (state, action) => {
            console.log("reducers", action)
            state.isLoading = false,
                state.fetchAPIinRTK = action.payload
        })
    }
});

export const { addTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;