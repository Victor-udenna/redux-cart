import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./auth-slice"
import cartSlice from "./cart-slice";
import uislice from "./ui-slice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        cart: cartSlice.reducer,
        ui: uislice.reducer
    }
});

export default store;