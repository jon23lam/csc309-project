import React, { useState, useEffect, useContext } from 'react';
import { AuthStore } from "../stores/AuthStore"
import { AuthStoreContext } from '../contexts/AuthStoreContext';

export function AuthenticationProvider({ children }) {
  const [authStore] = useState(() => new AuthStore());

  return (
    <AuthStoreContext.Provider value={authStore}>
      {authStore ? children : <div>Loading...</div>}
    </AuthStoreContext.Provider>
  );
}

export default AuthenticationProvider
