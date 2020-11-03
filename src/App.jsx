import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { hot } from 'react-hot-loader/root';

import HomeContent from './components/HomeContent/HomeContent';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

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
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route exact path="/">
            <HomeContent />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default hot(App);
