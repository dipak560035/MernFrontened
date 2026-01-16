import { createSlice } from "@reduxjs/toolkit";

// --- LocalStorage Helpers ---
const safeGetUser = () => {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.error("Failed to parse user from localStorage:", error);
    return null;
  }
};

const safeSetUser = (user) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("user", JSON.stringify(user));
  } catch (error) {
    console.error("Failed to save user to localStorage:", error);
  }
};

const safeRemoveUser = () => {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem("user");
  } catch (error) {
    console.error("Failed to remove user from localStorage:", error);
  }
};

const safeSetToken = (token) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("token", token);
  } catch (error) {
    console.error("Failed to save token to localStorage:", error);
  }
};

const safeRemoveToken = () => {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem("token");
  } catch (error) {
    console.error("Failed to remove token from localStorage:", error);
  }
};

// --- Redux Slice ---
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: safeGetUser(), // loads once on app start
  },
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;

      // Save to localStorage
      safeSetUser(user);
      if (token) safeSetToken(token);
    },
    removeUser: (state) => {
      state.user = null;

      // Remove from localStorage
      safeRemoveUser();
      safeRemoveToken();

      // Extra safeguard: remove any leftover keys containing "user" or "token"
      if (typeof window !== "undefined") {
        Object.keys(localStorage).forEach((key) => {
          if (key.toLowerCase().includes("user") || key.toLowerCase().includes("token")) {
            localStorage.removeItem(key);
          }
        });
      }
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
























// import { createSlice } from "@reduxjs/toolkit";

// // --- LocalStorage Helpers ---
// const safeGetUser = () => {
//   try {
//     const raw = localStorage.getItem("user");
//     return raw ? JSON.parse(raw) : null;
//   } catch {
//     return null;
//   }
// };

// const safeSetUser = (user) => {
//   try {
//     localStorage.setItem("user", JSON.stringify(user));
//   } catch {}
// };

// const safeRemoveUser = () => {
//   try {
//     localStorage.removeItem("user");
//   } catch {}
// };

// const safeSetToken = (token) => {
//   try {
//     localStorage.setItem("token", token);
//   } catch {}
// };

// const safeRemoveToken = () => {
//   try {
//     localStorage.removeItem("token");
//   } catch {}
// };

// // --- Redux Slice ---
// const userSlice = createSlice({
//   name: "user",
//   initialState: {
//     user: safeGetUser(), // loads once on app start
//   },
//   reducers: {
//     setUser: (state, action) => {
//       const { user, token } = action.payload;
//       state.user = user;
//       safeSetUser(user);
//       if (token) safeSetToken(token);
//     },
//     removeUser: (state) => {
//       state.user = null;
//       safeRemoveUser();
//       safeRemoveToken();
//     },
//   },
// });

// export const { setUser, removeUser } = userSlice.actions;
// export default userSlice.reducer;



















// import { createSlice } from "@reduxjs/toolkit";

// // Load user safely
// const safeGetUser = () => {
//   if (typeof window === "undefined") return null;
//   try {
//     const raw = localStorage.getItem("user");
//     return raw ? JSON.parse(raw) : null;
//   } catch (e) {
//     console.error("Failed to parse user from localStorage", e);
//     return null;
//   }
// };

// // Save user safely
// const safeSetUser = (user) => {
//   if (typeof window === "undefined") return;
//   try {
//     localStorage.setItem("user", JSON.stringify(user));
//   } catch (e) {
//     console.error("Failed to save user to localStorage", e);
//   }
// };

// // Remove user safely
// const safeRemoveUser = () => {
//   if (typeof window === "undefined") return;
//   try {
//     localStorage.removeItem("user");
//   } catch (e) {
//     console.error("Failed to remove user from localStorage", e);
//   }
// };

// // Optional token helpers
// const safeSetToken = (token) => {
//   if (typeof window === "undefined") return;
//   try {
//     localStorage.setItem("token", token);
//   } catch (e) {
//     console.error("Failed to save token", e);
//   }
// };

// const safeRemoveToken = () => {
//   if (typeof window === "undefined") return;
//   try {
//     localStorage.removeItem("token");
//   } catch (e) {
//     console.error("Failed to remove token", e);
//   }
// };

// const userSlice = createSlice({
//   name: "user",
//   initialState: {
//     user: safeGetUser(),
//   },
//   reducers: {
//     setUser: (state, action) => {
//       state.user = action.payload.user;
//       safeSetUser(action.payload.user);

//       if (action.payload.token) {
//         safeSetToken(action.payload.token);
//       }
//     },
//     removeUser: (state) => {
//       state.user = null;
//       safeRemoveUser();
//       safeRemoveToken();
//     },
//   },
// });

// export const { setUser, removeUser } = userSlice.actions;
// export default userSlice.reducer;

















// import { createSlice } from "@reduxjs/toolkit";

// // Helpers for safe localStorage access
// const safeGet = () => {
//   try {
//     const raw = localStorage.getItem("user");
//     return raw ? JSON.parse(raw) : null;
//   } catch {
//     return null;
//   }
// };

// const safeSet = (user) => {
//   try {
//     localStorage.setItem("user", JSON.stringify(user));
//   } catch {}
// };

// const safeRemove = () => {
//   try {
//     localStorage.removeItem("user");
//   } catch {}
// };

// // Slice definition
// const userSlice = createSlice({
//   name: "user",
//   initialState: {
//     user: safeGet(), // load from localStorage at startup
//   },
//   reducers: {
//     setUser: (state, action) => {
//       state.user = action.payload;
//       safeSet(action.payload);
//     },
//     removeUser: (state) => {
//       state.user = null;
//       safeRemove();
//       localStorage.removeItem("token"); // also clear token
//     },
//   },
// });

// // Export actions and reducer
// export const { setUser, removeUser } = userSlice.actions;
// export default userSlice.reducer;   // <-- THIS is the reducer














// import { createSlice } from "@reduxjs/toolkit";

// // Helpers for safe localStorage access
// const safeGet = () => {
//   try {
//     const raw = localStorage.getItem("user");
//     return raw ? JSON.parse(raw) : null;
//   } catch {
//     return null;
//   }
// };

// const safeSet = (user) => {
//   try {
//     localStorage.setItem("user", JSON.stringify(user));
//   } catch {
//     // ignore storage errors
//   }
// };

// const safeRemove = () => {
//   try {
//     localStorage.removeItem("user");
//   } catch {
//     // ignore storage errors
//   }
// };

// // Slice definition
// const userSlice = createSlice({
//   name: "user",
//   initialState: {
//     user: safeGet(), // load from localStorage at startup
//   },
//   reducers: {
//     setUser: (state, action) => {
//       state.user = action.payload;
//       safeSet(action.payload);
//     },
//     removeUser: (state) => {
//       state.user = null;
//       safeRemove();
//       localStorage.removeItem("token"); // also clear token
//     },
//   },
// });

// // Export actions and reducer
// export const { setUser, removeUser } = userSlice.actions;
// export default userSlice.reducer;