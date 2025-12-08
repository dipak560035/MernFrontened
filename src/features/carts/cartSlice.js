

import { createSlice } from "@reduxjs/toolkit";
import { getCartFromLocal, setCartsToLocal } from "../local/local";

export const cartSlice = createSlice({
  name: 'cartSlice',
  initialState: {
    carts: getCartFromLocal()
  },

  reducers: {
    setCart: (state, action) => {
      // FIXED:
      const isExist = state.carts.find(item => item.id === action.payload.id);

      if (isExist) {
        // 🔁 Update the existing product
        state.carts = state.carts.map(cart => {
          return cart.id === action.payload.id ? action.payload : cart;
        });
      } else {
        // ➕ Add new product
        state.carts.push(action.payload);
      }
      

      // 💾 Save updated carts to localStorage
      setCartsToLocal(state.carts);
    },
     removeCart: (state, action) => {
      state.carts = state.carts.filter(item => item.id !== action.payload.id);
      setCartsToLocal(state.carts);
    },
    clearCart: (state) => {
      state.carts = []
      setCartsToLocal(state.carts);
    }
  }
});

export const { setCart, removeCart, clearCart} = cartSlice.actions;
