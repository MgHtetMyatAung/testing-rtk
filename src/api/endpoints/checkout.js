import { baseApi } from "../config/baseApi";

// version 1 ------------------------------------------
export const checkoutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    checkout: builder.mutation({
      query: (data) => ({
        url: "/checkout",
        method: "POST",
        body: data,
      }),
    }),
    payment: builder.mutation({
      query: (data) => ({
        url: "/payment",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCheckoutMutation, usePaymentMutation } = checkoutApi;

// version 2 ------------------------------------------

// import { baseApi } from "../config/baseApi"; // Assuming you have a base API config

// export const ecommerceApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     // 1st API: Payment API
//     payment: builder.mutation({
//       query: (paymentDetails) => ({
//         url: "/payment",
//         method: "POST",
//         body: paymentDetails,
//       }),
//       onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
//         try {
//           // Await the payment call to succeed
//           const paymentResult = await queryFulfilled;

//           // If payment is successful, trigger checkout API call
//           const { orderId } = paymentResult.data; // Assume the response contains an orderId

//           // Now, trigger the checkout mutation (or invalidate tags if necessary)
//           dispatch(
//             ecommerceApi.endpoints.checkout.initiate({
//               orderId,
//             })
//           );
//         } catch (error) {
//           console.log("Payment error:", error);
//         }
//       },
//     }),

//     // 2nd API: Checkout API
//     checkout: builder.mutation({
//       query: (checkoutDetails) => ({
//         url: "/checkout",
//         method: "POST",
//         body: checkoutDetails,
//       }),
//       // Invalidate any relevant queries if necessary (e.g., cart data)
//       invalidatesTags: ["Cart", "OrderHistory"],
//     }),
//   }),
// });

// // Export the hooks for the queries/mutations
// export const { usePaymentMutation, useCheckoutMutation } = ecommerceApi;
