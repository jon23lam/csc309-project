import React, { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { observer } from "mobx-react";
import { AuthStoreContext } from "../contexts/AuthStoreContext";
import { ROLE_SHELTER } from "../stores/AuthStore";

export const ShelterRoute = observer(() => {
  const authStore = useContext(AuthStoreContext);
  const location = useLocation();
  const { context } = authStore;
  const { currentUser } = context;

  const [role, setRole] = useState("");

  useEffect(() => {
    if (currentUser) {
      setRole(currentUser.role);
    }
  }, [currentUser]);

  return (
    <div data-testid="ShelterRoute">
      {role !== "" &&
        (role === ROLE_SHELTER ? (
          <Outlet />
        ) : (
          <Navigate to="/search/list" state={{ from: location }} replace />
        ))}
    </div>
  );
});

export default ShelterRoute;
