import { baseApi } from "../config/baseApi";
import { revalidate } from "../revalidate";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: (id) => ({
        url: `/api/merchant/product/${id}`,
        // headers: access_token(),
      }),
      providesTags: [revalidate.product],
    }),
  }),
});

export const { useGetProductQuery } = productApi;
