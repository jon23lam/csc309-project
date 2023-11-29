import React, { useContext } from "react";
import { AuthStoreContext } from "../contexts/AuthStoreContext";

export const AppContext = React.createContext();
export const AppConsumer = AppContext.Consumer;

export function AppProvider({ children }) {
  const authStore = useContext(AuthStoreContext);
  if (!authStore) {
    return <div>Loading...</div>;
  }

  const { context } = authStore;

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
}

export default AppProvider;
