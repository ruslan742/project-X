import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import NameOfStore from "./components/pages/NameOfStore";
import Gallery from "./components/pages/Gallery";
import Customizer from "./components/pages/Customizer";
import SignIn from "./auth/SingIn";
import SignUp from "./auth/SignUp";
// import PaymentPage from "./components/pages/PaymentPage";
import PayPage from "./components/pages/PayPage";
// import state from "./store";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./auth/firebase";
// import { auth } from "./components/firebase";
import state from "../src/store";
import { useSnapshot } from "valtio";
import axios from "axios";
import Account from "./components/pages/Account";

const App = () => {
  const snap = useSnapshot(state);
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email } = user;
        state.email = email;
      }
    });

    try {
      const userMail = snap.email;
      if (userMail) {
       
        axios.get(`api/bascet/${userMail}`).then(({ data }) => {
          state.cartItems = data;
          state.totalQuantities = state.cartItems.reduce((acc, el) => {
            return acc + Number(el.quantity);
          }, 0);
          state.totalPrice = state.cartItems.reduce((acc, el) => {
            return acc + Number(el.price);
          }, 0);
        });
      }
    } catch (error) {
      alert(error.response.data.message || "Oops!");
    }
    ////console.log('nachalo',snap.cartItems)
    // try {
    //   axios.get(`api/bascet/:${}`).then(({data})=>{
    //     //console.log(data)
    //     //const items=data.map((element)=>({...element}))
    //     ////console.log('items',items)
    //     state.cartItems=data
    //   });
    // } catch (error) {
    //   alert(error.response.data.message || "Oops!");
    // }
  }, [snap.email]);

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
          path: "/favorites",
          element: <Account />, //user={user}
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
