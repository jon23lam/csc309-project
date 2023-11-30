import React, { useState, useContext } from "react";
import { AuthStoreContext } from "../contexts/AuthStoreContext";
import { RootStore } from "../stores/RootStore";

export const RootStoreContext = React.createContext(null);

export function RootProvider({ children }) {
  const authStore = useContext(AuthStoreContext);
  const [rootStore, setRootStore] = useState(() => new RootStore(authStore));

  return (
    <RootStoreContext.Provider value={rootStore}>
      {rootStore ? children : null}
    </RootStoreContext.Provider>
  );
}

export default RootProvider;
