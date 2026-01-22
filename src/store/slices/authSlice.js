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
  role: initialUser?.role || "guest",
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case "auth/loginSuccess": {
      const { token, user } = action.payload;
      try {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
      } catch {}
      return { ...state, token, user, role: user?.role || "user" };
    }
    case "auth/logout": {
      try {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      } catch {}
      return { token: null, user: null, role: "guest" };
    }
    default:
      return state;
  }
}

export const loginSuccess = (payload) => ({ type: "auth/loginSuccess", payload });
export const logout = () => ({ type: "auth/logout" });
