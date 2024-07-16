import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./auth/firebase";
import state from "./store";
import { useSnapshot } from "valtio";
import axios from "axios";
import { doc, getDoc, enableIndexedDbPersistence } from "firebase/firestore";
import Layout from "./components/Layout";
import NameOfStore from "./components/pages/NameOfStore";
import Gallery from "./components/pages/Gallery";
import Customizer from "./components/pages/Customizer";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import PayPage from "./components/pages/PayPage";
import Favourites from "./components/pages/Favourites";
import PrivateRoute from "./auth/PrivateRoute";

const App = () => {
  const snap = useSnapshot(state);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { email } = user;
        state.email = email;

        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            state.userName = userData.userName || "";
          }
        } catch (error) {
          console.error("Failed to fetch user data:", error.message);
        }
      }
    });

    try {
      axios.get("/api/bascet/").then(({ data }) => {
        const items = data.map((element) => ({
          ...JSON.parse(element.product),
          id: element.id,
        }));
        state.cartItems = items;
      });
    } catch (error) {
      alert(error.response.data.message || "Oops!");
    }

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div>
        <Toaster />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<NameOfStore />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/constructor" element={<Customizer />} />
            <Route
              path="/favourites"
              element={
                <PrivateRoute isAllowed={!!snap.email} redirect="/signin">
                  <Favourites />
                </PrivateRoute>
              }
            />
            <Route
              path="/signin"
              element={
                <PrivateRoute isAllowed={!snap.email} redirect="/">
                  <SignIn />
                </PrivateRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PrivateRoute isAllowed={!snap.email} redirect="/">
                  <SignUp />
                </PrivateRoute>
              }
            />
            <Route
              path="/payment"
              element={
                <PrivateRoute isAllowed={!!snap.email} redirect="/signin">
                  <PayPage />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
