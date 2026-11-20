import { configureStore } from "@reduxjs/toolkit";
import productReducer , {fetchProducts} from "../slices/productSlice";
import cartReducer , {getTotals, populateCart} from "../slices/cartSlice";
import { productsApi } from "../slices/productsApi";

export const store = configureStore({
    reducer : {
        products : productReducer,
        cart : cartReducer,
        [productsApi.reducerPath] : productsApi.reducer
    },
    middleware : getDefaultMiddleware => getDefaultMiddleware().concat(productsApi.middleware)
});

store.dispatch(fetchProducts());
store.dispatch(populateCart());
store.dispatch(getTotals());