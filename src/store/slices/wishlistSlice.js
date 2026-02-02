const initialWishlist = (() => {
  try {
    const raw = localStorage.getItem("wishlist");
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
        localStorage.setItem("wishlist", JSON.stringify(items));
      } catch (err) {
        console.error("Failed to save wishlist", err);
      }
      return { ...state, items };
    }
    case "wishlist/clear": {
      try {
        localStorage.removeItem("wishlist");
      } catch (err) {
        console.error("Failed to clear wishlist", err);
      }
      return { ...state, items: [] };
    }
    default:
      return state;
  }
}

export const toggleWishlist = (payload) => ({ type: "wishlist/toggle", payload });
export const clearWishlist = () => ({ type: "wishlist/clear" });
