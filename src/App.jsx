import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { hot } from 'react-hot-loader/root';

import { AuthContextProvider } from './utils/authContext';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

const App = () => {
  const muiTheme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          primary: {
            main: '#b71c1c',
          },
          secondary: {
            main: '#1cb7b7',
          },
        },
      }),
    []
  );

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <AuthContextProvider>
        <Router>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </AuthContextProvider>
    </ThemeProvider>
  );
};

export default hot(App);
