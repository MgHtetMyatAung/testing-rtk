import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCount } from "../../redux/slices/extra/addToCartSlice";
// import useAuth from "../../hooks/useAuth";

export default function Header() {
  // const { isAuthenticated } = useAuth();
  const count = useSelector(selectCount);
  console.log(count);
  return (
    <header className=" border-b">
      <nav className=" flex justify-between h-[70px] container mx-auto items-center">
        <Link to="/">Home</Link>
        <div className=" space-x-2">
          {/* {isAuthenticated ? (
            <Link to="/setting" className=" border px-3 py-2">
              setting
            </Link>
          ) : (
            <Link to="/login" className=" border px-3 py-2">
              login
            </Link>
          )} */}
          <Link to={"/todo"} className=" border px-3 py-2">
            Todos
          </Link>
          <Link to={"/post"} className=" border px-3 py-2">
            Posts
          </Link>
          <button className=" py-2 px-4 bg-gray-800 text-white">{count}</button>
        </div>
      </nav>
    </header>
  );
}
