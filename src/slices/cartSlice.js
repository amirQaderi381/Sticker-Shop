import { createEntityAdapter, createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const cartAdapter = createEntityAdapter();

const initialState = cartAdapter.getInitialState({
  cartTotalQty: 0,
  cartTotalAmount: 0,
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    populateCart: (state, action) => {
      if (localStorage.getItem("cartItems")) {
        cartAdapter.setAll(
          state,
          JSON.parse(localStorage.getItem("cartItems")),
        );
      }
    },
    addToCart: (state, action) => {
      const productExist = state.entities[action.payload.id];

      if (productExist) {
        state.entities[action.payload.id].cartQty += 1;
        toast.info("تعداد افزایش یافت", { position: "bottom-right" });
      } else {
        cartAdapter.addOne(state, action.payload);
        toast.success("محصول به سبد خرید اضافه شد", {
          position: "bottom-right",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.entities));
    },
    decreaseCart: (state, action) => {
      const product = state.entities[action.payload.id];

      if (product.cartQty > 1) {
        product.cartQty -= 1;
        toast.info("تعداد کاهش یافت", { position: "bottom-left" });
      } else if (product.cartQty == 1) {
        cartAdapter.removeOne(state, action.payload.id);
        toast.error("محصول از سبد خرید حذف شد", { position: "bottom-left" });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.entities));
    },
    removeFromCart: (state, action) => {
      cartAdapter.removeOne(state, action.payload.id);
      localStorage.setItem("cartItems", JSON.stringify(state.entities));

      toast.error("محصول از سبد خرید حذف شد", {
        position: "bottom-left",
      });
    },
    getTotals: (state) => {
      const { totalAmount, totalQuantity } = Object.values(
        state.entities,
      ).reduce(
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

export const { selectAll } = cartAdapter.getSelectors((state) => state.cart);

export const {
  populateCart,
  addToCart,
  getTotals,
  decreaseCart,
  removeFromCart,
} = cartSlice.actions;
export default cartSlice.reducer;
