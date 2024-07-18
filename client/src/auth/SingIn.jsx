import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "./firebase";
import { toast } from "react-toastify";
import state from "../store";
import { useSnapshot } from "valtio";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const snap = useSnapshot(state);
  const logIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        state.email = email;

        toast.success("Login successful!");
      })
      .catch((error) => {
        //console.log(error);
        toast.error("Login failed!");
      });
  };

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        //console.log(result.user);
        toast.success("Google login successful!");
      })
      .catch((error) => {
        //console.log(error);
        toast.error("Google login failed!");
      });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Log in</h1>
      <form onSubmit={logIn} className="w-full max-w-sm mx-auto bg-w p-8 rounded-md shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="email"
            id="email"
            name="email"
            placeholder="john@example.com"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="password"
            id="password"
            name="password"
            placeholder="********"
          />
        </div>
        <button
          className="w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
          type="submit"
        >
          Login
        </button>
        <button
          className="w-full mt-4 flex items-center justify-center text-sm font-bold text-red-600 hover:text-gray-800"
          onClick={signInWithGoogle}
          type="button"
        >
          <span>Sign in with Google</span>
          <img src="./google.jpg" alt="Google logo" className="ml-2" style={{ width: "35px" }} />
        </button>
      </form>
    </div>
  );
};

export default SignIn;
