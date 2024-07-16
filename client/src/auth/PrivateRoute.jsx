import React from "react";
import { Navigate } from "react-router-dom";
// import { useSnapshot } from "valtio";
// import state from "../store";

const PrivateRoute = ({ isAllowed, redirect, children }) => {
  return isAllowed ? children : <Navigate to={redirect} />;
};

export default PrivateRoute;
