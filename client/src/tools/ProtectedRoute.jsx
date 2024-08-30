

// import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Alert, AlertIcon, Button } from "@chakra-ui/react";

export default function ProtectedRoute({ children, authUser, isLogRequired, redirectTo='/', showAlert, setShowAlert }) {
 if (showAlert) {
  return (
    <>
      <Alert status="info">
        <AlertIcon />
        Сообщение админу о регистрации нового курьера отправлено.
        <Button onClick={() => setShowAlert(false)} variant="link" marginLeft="10px">
          Закрыть
        </Button>
      </Alert>
      {children}
    </>
  );
} else if (Boolean(authUser) === Boolean(isLogRequired)) {
  return children;
} else {
  return <Navigate to={redirectTo} />;
}
}