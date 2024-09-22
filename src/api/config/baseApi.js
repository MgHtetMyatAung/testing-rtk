import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "./baseQuery";
import { revalidate } from "../revalidate";

export const baseApi = createApi({
  reducerPath: "base",
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: Object.values(revalidate),
  endpoints: () => ({}),
});
