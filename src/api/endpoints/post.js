import { initialState, postsAdapter } from "../../redux/slices/extra/postSlice";
import { baseApi } from "../config/baseApi";
import { revalidate } from "../revalidate";

export const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => ({
        url: "/post",
        method: "GET",
      }),
      transformResponse: (response) =>
        postsAdapter.setAll(initialState, response),
    }),
  }),
});

export const { useGetPostsQuery } = postApi;
