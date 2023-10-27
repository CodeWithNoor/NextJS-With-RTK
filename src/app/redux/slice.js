const { createSlice, nanoid } = require("@reduxjs/toolkit");

const initialState = {
    user: [],
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action) => {
            console.log(action)
            const data = {
                id: nanoid(),
                payload: action.payload,
            }
            state.user.push(data);
            // console.log(data)
        },
        removeUser: (state, action) => {
            const data = state.user.filter((item) => {
                return item.id !== action.payload

            });
            state.user = data;
        },
        updateUser: (state, action) => {
            const { id } = action.payload
            console.log(id, "action")
            const editData = state.user.filter((item) => {
                return item.id !== action.payload
            })
            state.user = editData
            console.log(state.user, "state")
        }
    }
})



export const { addUser, removeUser, updateUser } = userSlice.actions;
export default userSlice.reducer
