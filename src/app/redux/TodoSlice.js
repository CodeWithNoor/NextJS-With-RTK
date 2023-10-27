const { createSlice, nanoid, current, createAsyncThunk } = require("@reduxjs/toolkit");
import axios from "axios";


// createAsyncThunk ===> manage data fetching in RTK  
// createAsyncThunk ===> return a standard Redux thunk action creator (pending, fulfilled, rejected)

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