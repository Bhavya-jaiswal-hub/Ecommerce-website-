import React from 'react'
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContextValue";

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(ShopContext);

  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
