import { useLogoutMutation } from "../../api/endpoints/auth";

export default function SettingPage() {
  const [logout, { isLoading }] = useLogoutMutation();
  async function handleLogout() {
    await logout();
  }
  return (
    <div>
      <p>SettingPage (Private route)</p>
      <button onClick={handleLogout} className=" border px-3 py-2">
        {isLoading ? "loading ..." : "logout"}
      </button>
    </div>
  );
}
