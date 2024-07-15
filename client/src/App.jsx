import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './auth/firebase';
import state from './store';
import { useSnapshot } from 'valtio';
import axios from 'axios';
import { doc, getDoc } from 'firebase/firestore';
import Layout from './components/Layout';
import NameOfStore from './components/pages/NameOfStore';
import Gallery from './components/pages/Gallery';
import Customizer from './components/pages/Customizer';
import SignIn from './auth/SingIn';
import SignUp from './auth/SignUp';
import PaymentPage from './components/pages/PaymentPage';
import PayPage from './components/pages/PayPage';
import Favourites from './components/pages/Favourites';

const App = () => {
  const snap = useSnapshot(state);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { email } = user;
        state.email = email;

        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          state.userName = userData.userName || '';
        }
      }
    });

    try {
      axios.get('api/cart/').then(({ data }) => {
        const items = data.map((element) => ({ ...JSON.parse(element.product), id: element.id }));
        state.cartItems = items;
      });
    } catch (error) {
      alert(error.response.data.message || 'Oops!');
    }

    return () => unsubscribe();
  }, []);

  const isAuthenticated = () => {
    return !!snap.email; 
  };

  return (
    <Router>
      <div>
        <Toaster /> 
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<NameOfStore />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/constructor" element={<Customizer />} />
            <Route path="/favourites" element={isAuthenticated() ? <Favourites /> : <Navigate to="/signin" />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/payment" element={isAuthenticated() ? <PayPage /> : <Navigate to="/signin" />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
