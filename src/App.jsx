import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
  ThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
} from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { hot } from 'react-hot-loader/root';

import { AuthContextProvider, useAuth } from './utils/authContext';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Chat from './pages/Chat/Chat';
import Stream from './pages/Stream/Stream';

const App = () => {
  const muiTheme = React.useMemo(
    () =>
      responsiveFontSizes(
        createMuiTheme({
          palette: {
            primary: {
              main: '#b71c1c',
            },
            secondary: {
              main: '#1cb7b7',
            },
          },
        })
      ),
    []
  );

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <AuthContextProvider>
        <AppRoutes />
      </AuthContextProvider>
    </ThemeProvider>
  );
};

const AppRoutes = () => {
  const { loaded } = useAuth();
  if (!loaded) {
    return <p>Loading...</p>;
  }
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/chat">
          <Chat />
        </Route>
        <Route path="/stream">
          <Stream />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default hot(App);
