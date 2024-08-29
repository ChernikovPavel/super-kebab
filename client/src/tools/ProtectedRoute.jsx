

// import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
// import { Alert, AlertIcon, Button } from "@chakra-ui/react";

export default function ProtectedRoute({ children, authUser, isLogRequired, redirectTo='/', showAlert, setShowAlert }) {
 

  

  if (Boolean(authUser) === Boolean(isLogRequired)) {
    return children;
    
  } else {
    return <Navigate to={redirectTo} />;
  }
}
