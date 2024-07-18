import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "./firebase";
import { toast } from "react-toastify";
import { doc, getDoc } from "firebase/firestore";
import state from "../store";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const logIn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("userCredential", userCredential);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        state.userName = userData.userName;
        state.email = userData.email;
      }

      setEmail("");
      setPassword("");
      toast.success("Login successful!");
      navigate("/"); // Переход на главную страницу
    } catch (error) {
      console.log(error);
      toast.error("Login failed!");
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        state.userName = userData.userName;
        state.email = userData.email;
      }

      toast.success("Google login successful!");
      navigate("/"); // Переход на главную страницу
    } catch (error) {
      console.log(error);
      toast.error("Google login failed!");
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Log in</h1>
      <form onSubmit={logIn} className="w-full max-w-sm mx-auto bg-w p-8 rounded-md shadow-md">
        <div className="mb-4">
          <label className="block text-red-600 text-lg font-bold mb-2" htmlFor="email">
            Email:
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
          <label className="block text-red-600 text-lg font-bold mb-2" htmlFor="password">
            Password:
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
          className="mt-7 w-full bg-indigo-500 text-white text-lg font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
          type="submit"
        >
          Login
        </button>
        <button
          className="w-full mt-4 flex items-center justify-center text-lg font-bold text-red-600 hover:text-blue"
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
