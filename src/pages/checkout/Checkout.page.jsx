import {
  useCheckoutMutation,
  usePaymentMutation,
} from "../../api/endpoints/checkout";

export default function CheckoutPage() {
  const [checkout, { isLoading: checkoutLoading, error: checkoutError }] =
    useCheckoutMutation();
  const [payment, { isLoading: paymentLoading, error: paymentError }] =
    usePaymentMutation();

  // version 1 ------------------------------
  async function handleCheckout() {
    try {
      const res = await checkout({
        name: "test",
        email: "test@gmail.com",
        phone: "0909090909",
        address: "test address",
      }).unwrap();
      console.log(res, "Checkout success");

      const paymentRes = await payment(res.data.id).unwrap();
      console.log(paymentRes, " Payment success");
    } catch (error) {
      console.log(error, " fail to checkout");
    }
  }

  // version 2 ---------------------------------

  // const handlePayment = async () => {
  //     try {
  //       // Call the payment mutation
  //       await payment(paymentDetails).unwrap();
  //       // Payment is successful, checkout will automatically be triggered
  //     } catch (error) {
  //       console.error("Payment failed:", error);
  //     }
  //   };

  if (checkoutLoading || paymentLoading) return <div>Loading...</div>;
  if (checkoutError || paymentError) return <div>Error</div>;
  return (
    <section className=" py-10">
      <div className=" container mx-auto">
        <h1>CheckoutPage</h1>
        <button onClick={handleCheckout}>Checkout</button>
      </div>
    </section>
  );
}
