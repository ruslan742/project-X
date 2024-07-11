import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import NameOfStore from "./components/pages/NameOfStore";
import Gallery from "./components/pages/Gallery";
import Customizer from "./components/pages/Customizer";
import SignIn from "./auth/SingIn";
import SignUp from "./auth/SignUp";

const App = () => {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        { path: "/", element: <NameOfStore /> },
        { path: "/gallery", element: <Gallery /> },
        { path: "/constructor", element: <Customizer /> },
        { path: "/signin", element: <SignIn /> },
        { path: "/signup", element: <SignUp /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
