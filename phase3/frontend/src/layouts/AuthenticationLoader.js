import React, { useContext } from "react";
import PropTypes from "prop-types";
import { AuthStoreContext } from "../contexts/AuthStoreContext"; 

export function AuthenticationLoader({ children }) {
  const authStore = useContext(AuthStoreContext);
  const { isLoading } = authStore;

  return <div>{isLoading ? <div>Loading...</div> : <div>{children}</div>}</div>;
}

AuthenticationLoader.propTypes = {
  children: PropTypes.node,
};

export default AuthenticationLoader;
