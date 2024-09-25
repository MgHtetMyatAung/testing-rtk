import { setTokens, systemLogout } from "../../redux/slices/authSlice";
import { baseApi } from "../config/baseApi";
import { revalidate } from "../revalidate";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: `/auth/login`,
        method: "POST",
        body: JSON.stringify(body),
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // Assume API response returns accessToken and refreshToken
          dispatch(
            setTokens({
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
            })
          );
        } catch (err) {
          console.error("Login failed", err);
        }
      },
      invalidatesTags: [revalidate.auth],
    }),

    register: builder.mutation({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
      invalidatesTags: [revalidate.auth],
    }),

    changePassword: builder.mutation({
      query: (body) => ({
        url: "/auth/change-password",
        method: "POST",
        body,
      }),
      invalidatesTags: [revalidate.auth],
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/api/auth/token",
        method: "DELETE",
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.status === "success") {
            dispatch(systemLogout());
          }
        } catch (err) {
          console.error("Logout failed", err);
        }
      },
      invalidatesTags: [revalidate.auth],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useChangePasswordMutation,
  useLogoutMutation,
} = authApi;
