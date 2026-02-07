const getKey = () => {
  try {
    const rawUser = localStorage.getItem("user");
    const u = rawUser ? JSON.parse(rawUser) : null;
    const id = u?._id || "guest";
    return `wishlist:${id}`;
  } catch {
    return "wishlist:guest";
  }
};

const initialWishlist = (() => {
  try {
    const raw = localStorage.getItem(getKey());
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
})();

const initialState = {
  items: initialWishlist,
};

export default function wishlistReducer(state = initialState, action) {
  switch (action.type) {
    case "wishlist/toggle": {
      const item = action.payload;
      const exists = state.items.find((i) => i.id === item.id);
      let items;
      if (exists) {
        items = state.items.filter((i) => i.id !== item.id);
      } else {
        items = [...state.items, item];
      }
      try {
        localStorage.setItem(getKey(), JSON.stringify(items));
      } catch { void 0; }
      return { ...state, items };
    }
    case "wishlist/clear": {
      try {
        localStorage.removeItem(getKey());
      } catch { void 0; }
      return { ...state, items: [] };
    }
    case "auth/loginSuccess": {
      try {
        const raw = localStorage.getItem(getKey());
        const items = raw ? JSON.parse(raw) : [];
        return { ...state, items };
      } catch {
        return { ...state, items: [] };
      }
    }
    case "auth/logout": {
      try {
        const raw = localStorage.getItem(getKey());
        const items = raw ? JSON.parse(raw) : [];
        return { ...state, items };
      } catch {
        return { ...state, items: [] };
      }
    }
    default:
      return state;
  }
}

export const toggleWishlist = (payload) => ({ type: "wishlist/toggle", payload });
export const clearWishlist = () => ({ type: "wishlist/clear" });
