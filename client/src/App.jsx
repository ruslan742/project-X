import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import NameOfStore from "./components/pages/NameOfStore";
import Gallery from "./components/pages/Gallery";
import Customizer from "./components/pages/Customizer";
import SignIn from "./auth/SingIn";
import SignUp from "./auth/SignUp";
import PaymentPage from "./components/pages/PaymentPage";
import PayPage from "./components/pages/PayPage";

const App = () => {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        { path: "/signin", element: <SignIn /> },
        { path: "/signup", element: <SignUp /> },

        {
          path: "/",
          element: <NameOfStore />,
        },
        {
          path: "/gallery",
          element: <Gallery />, //user={user}
        },
        {
          path: "/constructor",
          element: <Customizer />, //user={user}
        },
        {
          path: "/payment",
          element: <PayPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
