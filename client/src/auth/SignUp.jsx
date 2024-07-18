import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase";
import { toast } from "react-toastify";
import state from "../store";
import { doc, setDoc } from "firebase/firestore";
import { useSnapshot } from "valtio";
import axios from "axios";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      state.email = email;
      state.userName = username;

      await setDoc(doc(db, "users", user.uid), {
        userName: username,
        email: email,
      });

      toast.success("Registration successful!");
      navigate("/"); // Переход на главную страницу после успешной регистрации
    } catch (error) {
      console.log(error);
      toast.error("Registration failed!");
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Registration Form</h1>
      <form onSubmit={register} className="w-full max-w-sm mx-auto bg-w p-8 rounded-md shadow-md">
        <div className="mb-4">
          <label className="block text-red-600 text-lg font-bold mb-2" htmlFor="username">
            Username:
          </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="text"
            id="username"
            name="username"
            placeholder="Your Username"
          />
        </div>
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
          Register
        </button>
      </form>
    </div>
  );
};

export default SignUp;
