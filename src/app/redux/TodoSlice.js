const { createSlice, nanoid, current } = require("@reduxjs/toolkit");

const initialState = {
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
    }
});

export const { addTodo, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;