import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    cartItems: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            const item = action.payload;
            const exist = state.cartItems.find(
                (picture) => picture.id === item.id
            );
            /** check if picture already exist in the cart */
            /** if exist we increment the qty */
            /** if not we ad the item in the cart */
            if (exist) {
                toast.info("picture is already in the cart.", {
                    position: "top-right",
                });
            } else {
                state.cartItems = [item, ...state.cartItems];
                toast.success("picture added to the cart.", {
                    position: "top-right",
                });
            }
        },
        removeFromCart(state, action) {
            const item = action.payload
            state.cartItems = state.cartItems.filter(picture => picture.id !== item.id)
            toast.info("picture removed from cart.", {
                position: "top-right",
            });
        },
        clearCartItems(state, action) {
            state.cartItems = []
        }
    },
});

const cartReducers = cartSlice.reducer

export const { addToCart, removeFromCart, clearCartItems } = cartSlice.actions

export default cartReducers
