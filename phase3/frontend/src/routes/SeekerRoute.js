import React, { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { observer } from "mobx-react";
import { AuthStoreContext } from "../contexts/AuthStoreContext";

export const SeekerRoute = observer(() => {
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
    <div data-testid="SeekerRoute">
      {role !== "" &&
        (role == "seeker" ? (
          <Outlet />
        ) : (
          <Navigate to="/manage_shelter" state={{ from: location }} replace />
        ))}
    </div>
  );
});

export default SeekerRoute;
