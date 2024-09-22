import { Link } from "react-router-dom";
import { useLoginMutation } from "../../api/endpoints/auth";

export default function LoginPage() {
  const [login, { isLoading }] = useLoginMutation();
  async function handleLogin() {
    await login({
      phone: "09981868466",
      password: "12345",
      type: "merchant",
    });
  }
  return (
    <div className=" space-y-2">
      <p>LoginPage (Auth route)</p>
      <div>
        <Link to="/" className=" border px-3 py-2">
          Home
        </Link>
      </div>
      <button onClick={handleLogin} className=" border px-3 py-2">
        {isLoading ? "loading ..." : "login"}
      </button>
    </div>
  );
}
