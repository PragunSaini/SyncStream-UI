import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { login as loginUser, refresh } from './api';

// Auth context object
export const AuthContext = React.createContext();

// Auth context provider for app
export const AuthContextProvider = props => {
  const [loaded, setLoaded] = useState(false);
  const [auth, setAuth] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const localAuth = window.localStorage.getItem('auth') || false;
    if (!localAuth) {
      setAuth(false);
      setUserData(null);
      setLoaded(true);
    } else {
      refreshToken();
    }
  }, []);

  useEffect(() => {
    if (loaded) {
      window.localStorage.setItem('auth', JSON.stringify(auth));
      window.localStorage.setItem('user', JSON.stringify(userData));
    }
  }, [auth, userData]);

  const refreshToken = async () => {
    try {
      const response = await refresh();
      setAuth(true);
      setUserData(response.data);
      window.localStorage.setItem('auth', JSON.stringify(true));
      window.localStorage.setItem('user', JSON.stringify(response.data));
    } catch (e) {
      setAuth(false);
      setUserData(null);
    } finally {
      setLoaded(true);
    }
  };

  const login = async data => {
    const response = await loginUser(data);
    setAuth(true);
    setUserData(response.data);
    return response.data;
  };

  const logout = async () => {
    setAuth(false);
    setUserData(null);
  };

  const context = {
    loaded,
    auth,
    userData,
    setAuth,
    setUserData,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
};

// Hook to use login and user data across app
export const useAuth = () => React.useContext(AuthContext);

AuthContextProvider.propTypes = {
  children: PropTypes.any,
};
