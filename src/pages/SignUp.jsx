import { Link, useNavigate } from "react-router-dom"; 
import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider  } from "firebase/auth";
import { auth } from "../utilis/firebase";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const navigate = useNavigate()

//E-mail
  function handleSignUpWithEmail() {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log("User account Created", user);
        setLoading(false);
        navigate("/");
      })

      .catch((err) => {
        console.log("err in making account", err);
        setLoading(false);
      });
  }

  //GOOGLE
  function handleSignUpWithGoogle() {
    setLoadingGoogle(true)
    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        console.log("result", result);
        const token = credential.accessToken;
        const user = result.user;
        console.log("user=>", user);
        setLoadingGoogle(false)

        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error=>", errorCode, errorMessage);
        
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        setLoadingGoogle(false)

      });
  }

  return (
    <div className="max-w-sm mx-auto ">
      <div className="mb-5">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your User-Name
        </label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          id="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="User Name"
          required=""
        />

        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white my-4"
        >
          Your email
        </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="abc@gmail.com"
          required=""
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required=""
        />
      </div>
      <div className="flex items-start mb-5">
        <div className="flex items-center h-5"></div>

        <h1>
          Already have an acount?{" "}
          <Link to={"/signin"} className="text-blue-700">
            Login
          </Link>
        </h1>
      </div>

      <div className="mb-4 mx-auto">
        <button
          onClick={handleSignUpWithEmail}
          type="submit"
          className="text-white bg-gray-700 hover:bg-slate-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {loading ? "Loading" : "Sign Up With E-mail"}
        </button>
      </div>

      <div className="mb-4">
        <button
          onClick={handleSignUpWithGoogle}
          type="submit"
          className="text-white bg-gray-700 hover:bg-slate-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {loadingGoogle ? "Loading" : "Sign Up With Google"}
        </button>
      </div>
    </div>
  );
}

export default SignUp;
