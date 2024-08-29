import { Navigate } from "react-router-dom";

export default function RestrictedRoute({ children, authUser, isLogRequired/*при true требует быть авторизирвоанным, при false требует быть неавторизированным*/, redirectTo='/' }) {
  if (Boolean(authUser) == Boolean(isLogRequired)) {
    return children
  } else {
    return <Navigate to={redirectTo}></Navigate>;
  }
}
