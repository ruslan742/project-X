import { useState } from "react";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  function register(e) {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log(user);
        setEmail("");
        setPassword("");
      })
      .catch((error) => console.log(error));
  }

  


  return (
    
    <div className="container mx-auto py-8">
    <h1 className="text-2xl font-bold mb-6 text-center">Registration Form</h1>
    <form onSubmit={register} className="w-full max-w-sm mx-auto bg-w p-8 rounded-md shadow-md">
    
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
        <input  value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          type="email" id="email" name="email" placeholder="john@example.com"/>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)}className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          type="password" id="password" name="password" placeholder="********"/>
      </div>
      <button
        className="w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
        type="submit">Register</button>
    </form>
  </div>
  );
};

export default SignUp;
