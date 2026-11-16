import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cart")) ?? [], // cartItesm : [{id , name , cartQty , cartAmount}]
  cartTotalQty: 0,
  totalCartAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //my way :
    // addToCart : (state , action) => {
    //     const product = action.payload;
    //     const existingCart = state.cartItems.find(item => item.id === product.id);
    //     if(existingCart) {
    //         state.cartTotalQty += 1;
    //     }else {
    //         state.cartItems.push({
    //             ...product,
    //             cartTotalQty : 1
    //         })
    //     }

    //     localStorage.setItem("cart" , JSON.stringify(state.cartItems));
    // }
    addToCart: (state, action) => {
      const existingIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id,
      );

      if (existingIndex > 0) {
        state.cartItems[existingIndex] = {
          ...state.cartItems[existingIndex],
          cartQty: state.cartItems[existingIndex].cartQty + 1,
        };
        toast.info("تعداد افزایش یافت", { position: "bottom-right" });
      } else {
        state.cartItems.push({
          ...action.payload,
        });
        toast.success("محصول به سبد خرید اضافه شد", {
          position: "bottom-right",
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    //get all products count and total amounts
    // reduce() needs initial value for calculation : cartTotal = {totalAmount: 0,totalQuantity: 0} as second reduce argument

    getTotal: (state) => {
      const { totalAmount, totalQuantity } = state.cartItems.reduce(
        (cartSummary, cartItem) => {
          const { price, cartQty } = cartItem;

          cartSummary.totalAmount += price * cartQty;
          cartSummary.totalQuantity += cartQty;

          return cartSummary;
        },
        {
          totalAmount: 0,
          totalQuantity: 0,
        },
      );

      state.cartTotalQty = totalQuantity;
      state.cartTotalAmount = parseFloat(totalAmount.toFixed(2));
    },
  },
});

export const { addToCart, getTotals } = cartSlice.actions;
export default cartSlice.reducer;
