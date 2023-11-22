import React from 'react';
import { AuthStore } from '../stores/AuthStore';

export const AuthStoreContext = React.createContext(new AuthStore());