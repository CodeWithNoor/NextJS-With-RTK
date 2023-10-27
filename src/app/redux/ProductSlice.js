const { createSlice, nanoid, current } = require("@reduxjs/toolkit");

const initialState = {
    products: JSON.parse(localStorage.getItem("products")) ? JSON.parse(localStorage.getItem("products")) : []
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        addProduct: (state, action) => {
            console.log(action)
            const productData = {
                id: nanoid(),
                payload: action.payload
            }
            state.products.push(productData)
            const userProduct = current(state.products)
            localStorage.setItem("products", JSON.stringify(userProduct))
        },
        removeProduct: (state, action) => {
            const productId = state.products.filter((item) => {
                return item.id !== action.payload
            })
            state.products = productId
            console.log(current(state.products))
        }
    }

})

export const { addProduct, removeProduct } = productSlice.actions;

export default productSlice.reducer