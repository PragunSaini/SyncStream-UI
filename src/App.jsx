import React, { useState /* Suspense */ } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import {
  ThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
} from '@material-ui/core/styles';
import { CssBaseline, Snackbar } from '@material-ui/core';
import { hot } from 'react-hot-loader/root';

import { AuthContextProvider, useAuth } from './utils/authContext';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Room from './pages/Room/Room';
import Loader from './components/Loader/Loader';

// For lazy loading
// const Home = React.lazy(() => import('./pages/Home/Home'));
// const Login = React.lazy(() => import('./pages/Login/Login'));
// const Register = React.lazy(() => import('./pages/Register/Register'));
// const Room = React.lazy(() => import('./pages/Room/Room'));

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
  const [note, setNote] = useState(null);

  const notify = msg => {
    setNote(msg);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNote(null);
  };

  if (!loaded) {
    return <Loader />;
  }
  return (
    <>
      <Router>
        {/* <Suspense fallback={<Loader />}> */}
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/room/:roomid">
            <Room notify={notify} />
          </Route>
          <Route exact path="/">
            <Home notify={notify} />
          </Route>
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
        {/* </Suspense> */}
      </Router>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={note !== null}
        autoHideDuration={3000}
        onClose={handleClose}
        message={note == null ? '' : note}
      />
    </>
  );
};

export default hot(App);
