// import Footer from "./components/Footer";
import Gallery from "./components/pages/Gallery";
import Layout from "./components/Layout";
import NameOfStore from "./components/pages/NameOfStore";
// import Navbar from "./components/Navbar";
// import ProtectedRoute from "./components/hoc/ProtectedRoute";
import Customizer from "./components/pages/Customizer";
import PaymentPage from "./components/pages/PaymentPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const App = () => {
  const router = createBrowserRouter([
    {
      element: <Layout />, //user={user} logoutHandler={logoutHandler}
      children: [
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
          element: <PaymentPage />,
        },
        // {
        //   path: '/account',
        //   element: <ProtectedRoute isAllowed={!!user} redirect="/login"><AccountPage /></ProtectedRoute>,
        // },
        // {
        //   element: <ProtectedRoute isAllowed={!user} />,
        //   children: [
        //     {
        //       path: '/signup',
        //       element: <SignUpPage signUpHandler={signUpHandler} />,
        //     },
        //     {
        //       path: '/login',
        //       element: <LoginPage loginHandler={loginHandler} />,
        //     },
        //   ],
        // },
      ],
    },
  ]);
  return <RouterProvider router={router} />;

};

export default App;
