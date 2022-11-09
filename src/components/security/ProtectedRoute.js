import React, { useContext } from "react";
import {AuthContext} from "../../App";
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ children }) => {
  const { state } = useContext(AuthContext);

  if ( !state.user ) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default ProtectedRoute;
