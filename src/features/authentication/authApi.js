import { mainApi } from '@/app/mainApi';

export const authApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({

    // 🔐 Login
    userLogin: builder.mutation({
      query: (body) => ({
        url: '/users/login',
        method: 'POST',
        body: body,
      }),
    }),

    // 📝 Register
    userRegister: builder.mutation({
      query: (body) => ({
        url: '/users/register',
        method: 'POST',
        body: body,
      }),
    }),

  }),
});

// ✅ Export both hooks
export const {
  useUserLoginMutation,
  useUserRegisterMutation,
} = authApi;
