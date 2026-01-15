import { createSlice } from "@reduxjs/toolkit";

// Load user safely
const safeGetUser = () => {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error("Failed to parse user from localStorage", e);
    return null;
  }
};

// Save user safely
const safeSetUser = (user) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("user", JSON.stringify(user));
  } catch (e) {
    console.error("Failed to save user to localStorage", e);
  }
};

// Remove user safely
const safeRemoveUser = () => {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem("user");
  } catch (e) {
    console.error("Failed to remove user from localStorage", e);
  }
};

// Optional token helpers
const safeSetToken = (token) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("token", token);
  } catch (e) {
    console.error("Failed to save token", e);
  }
};

const safeRemoveToken = () => {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem("token");
  } catch (e) {
    console.error("Failed to remove token", e);
  }
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: safeGetUser(),
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      safeSetUser(action.payload.user);

      if (action.payload.token) {
        safeSetToken(action.payload.token);
      }
    },
    removeUser: (state) => {
      state.user = null;
      safeRemoveUser();
      safeRemoveToken();
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;

















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