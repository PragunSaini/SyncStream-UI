import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
}));

const MainNav = () => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" className={classes.title}>
          <Link component={RouterLink} to="/" color="inherit">
            SyncStream
          </Link>
        </Typography>
        <Button component={RouterLink} to="/login" color="inherit">
          Login
        </Button>
        <Button component={RouterLink} to="/register" color="inherit">
          Register
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default MainNav;
