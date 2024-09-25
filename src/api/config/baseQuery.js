import { fetchBaseQuery, retry } from "@reduxjs/toolkit/query";
import { decryptToken } from "../../libs/crypto";
import { setErrorInfo } from "../../redux/slices/errorSlice";
import { setTokens, systemLogout } from "../../redux/slices/authSlice";
// import { systemLogout } from "../../redux/slices/authSlice";

const baseQuery = retry(
  fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.accessToken;

      if (token) {
        const decryptedToken = decryptToken(token);
        // headers.set("access-token", decryptedToken);
        headers.set("Authorization", `Bearer ${decryptedToken}`);
      }

      return headers;
    },
  }),
  {
    maxRetries: 5,
  }
);

// Function to refresh token
const refreshAccessToken = async (api) => {
  const refreshToken = api.getState().auth.refreshToken;

  if (!refreshToken) {
    // If there is no refresh token, log the user out
    api.dispatch(systemLogout());
    return null;
  }

  // Make a request to refresh the token
  const refreshResult = await baseQuery(
    {
      url: "/auth/refresh", // Adjust this to your refresh endpoint
      method: "POST",
      body: { refreshToken },
    },
    api,
    {}
  );

  if (refreshResult?.data?.accessToken) {
    // Save the new access token
    const newAccessToken = refreshResult.data.accessToken;
    api.dispatch(setTokens({ accessToken: newAccessToken }));

    return newAccessToken;
  } else {
    // If the refresh token is invalid, log the user out
    api.dispatch(systemLogout());
    return null;
  }
};

export const baseQueryWithErrorHandling = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const newAccessToken = await refreshAccessToken(api);

    if (newAccessToken) {
      // Retry the original request with the new token

      args.headers = {
        ...args.headers,
        "access-token": newAccessToken,
      };

      result = await baseQuery(args, api, extraOptions); // Retry the original request
    }
  }

  if (result?.data?.status == "fail") {
    // Set the global error in the error slice
    // console.log(result);
    api.dispatch(setErrorInfo({ type: "error", message: result.data.error }));

    // Additional logic for handling specific errors (e.g., 401 Unauthorized)
    // if (result.error.status === 401) {
    //   api.dispatch(systemLogout()); // Clear tokens on unauthorized error
    // }
  }

  console.log(result);

  return result;
};
