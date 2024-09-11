import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../utilis/firebase";
import Swal from 'sweetalert2';

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const navigate = useNavigate(); 
  // E-mail Sign-In
  function handleSignInWithEmail() {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log(user);
        setLoading(false);
        {
          Swal.fire({
            title: "Welcome!",
            text: "User Registered Successfully!",
            icon: "success",
          });
        }
        navigate("/"); 
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        Swal.fire({
          title: "Oops!",
          text: "Something went wrong. Please try again.",
          icon: "error"
        });        
      });
  }

  // Google Sign-In
  function handleSignInWithGoogle() {
    setLoadingGoogle(true);
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("result=>", result);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log("user=>", user);
        setLoadingGoogle(false);
        {
          Swal.fire({
            title: "Welcome!",
            text: "User Registered Successfully!",
            icon: "success",
          });
        }
        navigate("/"); 
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error Code=>", errorCode);
        console.log("Error Message=>", errorMessage);

        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        setLoadingGoogle(false);
        Swal.fire({
          title: "Oops!",
          text: "Something went wrong. Please try again.",
          icon: "error"
        });
        
      });
  }

  return (
    <div className="max-w-sm container mx-auto mt-24">
      <div className="mb-5">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white my-4"
        >
          Your email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="abc@gmail.com"
          required
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <div className="flex items-start mb-5">
        <div className="flex items-center h-5"></div>

        <h1>
          Don't have an account?{" "}
          <Link to={"/signup"} className="text-blue-700">
            Create one
          </Link>
        </h1>
      </div>
      <button
        onClick={handleSignInWithEmail}
        type="submit"
        className="m-2 text-white bg-gray-700 hover:bg-slate-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {loading ? "Loading" : "Sign-In With E-mail"}
      </button>

      <button
        onClick={handleSignInWithGoogle}
        type="submit"
        className="text-white bg-gray-700 hover:bg-slate-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {loadingGoogle ? "Loading" : "Continue With Google"}
      </button>
    </div>
  );
}

export default SignIn;
