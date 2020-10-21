import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { hot } from 'react-hot-loader/root';

import MainNav from './components/MainNav/MainNav';
import HomeContent from './components/HomeContent/HomeContent';

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
      <MainNav />
      <HomeContent />
    </ThemeProvider>
  );
};

export default hot(App);
