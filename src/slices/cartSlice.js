import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) ?? [], // cartItesm : [{id , name , cartQty , cartAmount}]
  cartTotalQty: 0,
  cartTotalAmount: 0,
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

      if (existingIndex >= 0) {
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
    decreaseCart: (state, action) => {
      const existingIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.id === action.payload.id,
      );

      if (state.cartItems[existingIndex].cartQty > 1) {
        state.cartItems[existingIndex].cartQty -= 1;
        toast.info("تعداد کاهش یافت", { position: "bottom-left" });
      } else if (state.cartItems[existingIndex].cartQty == 1) {
        state.cartItems = state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload.id,
        );
        toast.error("محصول از سبد خرید حذف شد", { position: "bottom-left" });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id,
      );

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

      toast.error("محصول از سبد خرید حذف شد", {
        position: "bottom-left",
      });
    },

    //get all products count and total amounts
    // reduce() needs initial value for calculation : cartTotal = {totalAmount: 0,totalQuantity: 0} as second reduce argument

    getTotals: (state) => {
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

export const { addToCart, getTotals, decreaseCart, removeFromCart } =
  cartSlice.actions;
export default cartSlice.reducer;
