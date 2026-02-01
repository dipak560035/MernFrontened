// const initialToken = (() => {
//   try {
//     return localStorage.getItem("token") || null;
//   } catch {
//     return null;
//   }
// })();

// const initialUser = (() => {
//   try {
//     const raw = localStorage.getItem("user");
//     return raw ? JSON.parse(raw) : null;
//   } catch {
//     return null;
//   }
// })();

// const initialState = {
//   token: initialToken,
//   user: initialUser,
//   role: initialUser?.role || "guest",
// };

// export default function authReducer(state = initialState, action) {
//   switch (action.type) {
//     case "auth/loginSuccess": {
//       const { token, user } = action.payload;
//       try {
//         localStorage.setItem("token", token);
//         localStorage.setItem("user", JSON.stringify(user));
//       } catch {
//         console.warn("Storage unavailable");
//       }
//       return { ...state, token, user, role: user?.role || "user" };
//     }
//     case "auth/logout": {
//       try {
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//       } catch {
//         console.warn("Storage unavailable");
//       }
//       return { token: null, user: null, role: "guest" };
//     }
//     default:
//       return state;
//   }
// }

// export const loginSuccess = (payload) => ({ type: "auth/loginSuccess", payload });
// export const logout = () => ({ type: "auth/logout" });











// ===== LOAD FROM LOCAL STORAGE =====
const initialToken = (() => {
  try {
    return localStorage.getItem("token") || null;
  } catch {
    return null;
  }
})();

const initialUser = (() => {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
})();

const initialState = {
  token: initialToken,
  user: initialUser,
  role: initialUser?.role || "guest", // guest, user, admin
};

// ===== REDUCER =====
export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case "auth/loginSuccess": {
      const { token, user } = action.payload;
      try {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
      } catch {
        console.warn("Storage unavailable");
      }
      return {
        ...state,
        token,
        user,
        role: user?.role || "user", // default role if missing
      };
    }

    case "auth/meLoaded": {
      const { user } = action.payload;
      try {
        // keep token as-is, just update user + role
        localStorage.setItem("user", JSON.stringify(user));
      } catch {
        console.warn("Storage unavailable");
      }
      return {
        ...state,
        user,
        role: user?.role || "user",
      };
    }

    case "auth/logout": {
      try {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      } catch {
        console.warn("Storage unavailable");
      }
      return {
        token: null,
        user: null,
        role: "guest",
      };
    }

    default:
      return state;
  }
}

// ===== ACTION CREATORS =====
export const loginSuccess = (payload) => ({ type: "auth/loginSuccess", payload });
export const meLoaded = (payload) => ({ type: "auth/meLoaded", payload });
export const logout = () => ({ type: "auth/logout" });
