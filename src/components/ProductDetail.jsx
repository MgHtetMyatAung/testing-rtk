import { useGetProductQuery } from "../api/endpoints/product";

export default function ProductDetail() {
  const { data } = useGetProductQuery(14);
  console.log(data);
  async function getProduct() {}
  return (
    <div>
      <button onClick={getProduct}>get product detail</button>
    </div>
  );
}
