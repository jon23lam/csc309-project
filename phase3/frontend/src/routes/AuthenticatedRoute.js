import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { observer } from "mobx-react";
import { AuthStoreContext } from "../contexts/AuthStoreContext";

export const AuthenticatedRoute = observer(() => {
  const authStore = useContext(AuthStoreContext);
  const location = useLocation();
  const { isAuthenticated } = authStore;

  return (
    <div data-testid="AuthenticatedRoute">
      {isAuthenticated ? (
        <Outlet />
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      )}
    </div>
  );
});

export default AuthenticatedRoute;
