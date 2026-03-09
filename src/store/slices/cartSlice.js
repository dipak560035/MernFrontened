const initialCart = (() => {
  try {
    const raw = localStorage.getItem("cart");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
})();

const initialState = {
  items: initialCart,
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case "cart/add": {
      const item = action.payload;
      const existing = state.items.find((i) => i.id === item.id);
      let items;
      if (existing) {
        items = state.items.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + (item.qty || 1) } : i
        );
      } else {
        items = [...state.items, { ...item, qty: item.qty || 1 }];
      }
      try {
        localStorage.setItem("cart", JSON.stringify(items));
      } catch {
        console.warn("Storage unavailable");
      }
      return { ...state, items };
    }
    case "cart/remove": {
      const items = state.items.filter((i) => i.id !== action.payload);
      try {
        localStorage.setItem("cart", JSON.stringify(items));
      } catch {
        console.warn("Storage unavailable");
      }
      return { ...state, items };
    }
    case "cart/updateQty": {
      const { id, qty } = action.payload;
      const items = state.items.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i));
      try {
        localStorage.setItem("cart", JSON.stringify(items));
      } catch {
        console.warn("Storage unavailable");
      }
      return { ...state, items };
    }
    case "cart/clear": {
      try {
        localStorage.removeItem("cart");
      } catch {
        console.warn("Storage unavailable");
      }
      return { ...state, items: [] };
    }
    case "cart/set": {
      const items = Array.isArray(action.payload) ? action.payload : [];
      // Do NOT persist remote cart to localStorage; keep localStorage for guest carts only.
      return { ...state, items };
    }
    default:
      return state;
  }
}

export const addToCart = (payload) => ({ type: "cart/add", payload });
export const removeFromCart = (id) => ({ type: "cart/remove", payload: id });
export const clearCart = () => ({ type: "cart/clear" });
export const updateQty = (payload) => ({ type: "cart/updateQty", payload });
export const setCart = (items) => ({ type: "cart/set", payload: items });
