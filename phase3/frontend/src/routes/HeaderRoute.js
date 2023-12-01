import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { observer } from "mobx-react";
import { Header } from "../layouts/Header"

export const HeaderRoute = observer((props) => {
  // const authStore = useContext(AuthStoreContext);
  // const location = useLocation();
  // const { isAuthenticated } = authStore;

  return (
    <div data-testid="HeaderRoute">
      <Header />
      <Outlet />
    </div>
  );
});

export default HeaderRoute;