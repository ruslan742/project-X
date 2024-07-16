import React from "react";
import { Link } from "react-router-dom";
import "tailwindcss/tailwind.css";
import { errorImage } from "../../../public/assets/index"; // Импорт изображения

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <div className="text-center">
        <img
          src={errorImage}
          alt="Error"
          className="mx-auto mb-4 w-1/3 h-auto rounded"
        />
        <h1 className="text-6xl font-black mb-4">404 - Page Not Found</h1>
        <p className="text-xl mb-8">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link to="/">
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
            Go back to main page
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
