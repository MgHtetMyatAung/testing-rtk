import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Header() {
  const { isAuthenticated } = useAuth();
  return (
    <header className=" border-b">
      <nav className=" flex justify-between h-[70px] container mx-auto items-center">
        <Link to="/">Home</Link>
        <div>
          {isAuthenticated ? (
            <Link to="/setting" className=" border px-3 py-2">
              setting
            </Link>
          ) : (
            <Link to="/login" className=" border px-3 py-2">
              login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
