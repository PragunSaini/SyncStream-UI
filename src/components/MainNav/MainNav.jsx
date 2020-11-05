import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Link } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { makeStyles } from '@material-ui/core/styles';

import { useAuth } from '../../utils/authContext';

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
  },
  space: {
    marginRight: theme.spacing(1),
  },
}));

const MainNav = () => {
  const classes = useStyles();
  const { auth, userData, logout } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" className={classes.title}>
          <Link component={RouterLink} to="/" color="inherit">
            SyncStream
          </Link>
        </Typography>
        {!auth && (
          <>
            <Button
              className={classes.space}
              component={RouterLink}
              to="/login"
              color="inherit"
              startIcon={<PersonIcon />}>
              Login
            </Button>
            <Button
              component={RouterLink}
              to="/register"
              color="inherit"
              startIcon={<CreateIcon />}>
              Register
            </Button>
          </>
        )}
        {auth && (
          <>
            <Button
              color="inherit"
              startIcon={<PersonIcon />}
              className={classes.space}>
              {userData?.name}
            </Button>
            <Button
              color="inherit"
              startIcon={<ExitToAppIcon />}
              onClick={logout}>
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default MainNav;
