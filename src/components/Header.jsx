import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import { Avatar } from "antd";
import { signOut } from "firebase/auth";
import { auth } from "../utilis/firebase";

function Header() {
  const { theme, setTheme } = useContext(ThemeContext);
  const { user, setUser } = useContext(AuthContext);
  console.log("User in Header=>", user);
  const navigate = useNavigate()

  const HandleLogout = async () => {
    await signOut(auth).then(()=>{

      setUser({ isLogin: false, userInfo: {} });
      alert("User Logged Out");
      navigate("/")
    })
    .catch((error) => {
      console.error("Logout failed: ", error);
      alert("Failed to log out. Please try again.");
    });
  };
  return (
    <>
    
      <header
        className={`${
          theme === "dark"
            ? "text-white body-font bg-slate-600"
            : "text-black bg-slate-100"
        }`}
      >
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <span className="ml-3 text-2xl font-bold">Dream Bazar</span>
          </a>

          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400 flex flex-wrap items-center text-base justify-center">
            <Link to={"/"} className="m-5 hover:text-gray-900">
              Home
            </Link>
            <a className="m-5 hover:text-gray-900 cursor-pointer">Cart Items</a>
          </nav>

          {/* This div aligns Avatar and buttons in the same row */}
          <div className="flex items-center space-x-4">
            {user?.isLogin ? (
              <>
                <h1>{user?.userInfo?.name}</h1>
              </>
            ) : (
              <button
                className={`inline-flex items-center ${
                  theme === "dark"
                    ? "bg-gray-800 hover:bg-slate-900"
                    : "bg-slate-300 hover:bg-slate-500"
                } border-0 py-1 px-3 focus:outline-none rounded text-base`}
              >
                <Link to={"/signup"}>SignUp</Link>
              </button>
            )}
            {user.isLogin && user.userInfo ? (
              <>
                <Avatar 
                onClick={()=> navigate('/profile')}
                  src={user.userInfo.photoURL}
                  size="large"
                  className="mb-1 cursor-pointer"
                />
                <button
                  onClick={HandleLogout}
                  className={`inline-flex items-center ${
                    theme === "dark"
                      ? "bg-gray-800 hover:bg-slate-900"
                      : "bg-slate-300 hover:bg-slate-500"
                  } border-0 py-1 px-3 focus:outline-none rounded text-base`}
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                className={`inline-flex items-center ${
                  theme === "dark"
                    ? "bg-gray-800 hover:bg-slate-900"
                    : "bg-slate-300 hover:bg-slate-500"
                } border-0 py-1 px-3 focus:outline-none rounded text-base`}
              >
                <Link to={"/signin"}>Login</Link>
              </button>
            )}

            <button
              onClick={() =>
                theme === "light" ? setTheme("dark") : setTheme("light")
              }
              className={`inline-flex items-center ${
                theme === "dark"
                  ? "bg-gray-800 hover:bg-slate-900"
                  : "bg-slate-300 hover:bg-slate-500"
              } border-0 py-1 px-3 focus:outline-none rounded text-base`}
            >
              {theme === "light" ? "Make me dark" : "Make me light"}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
