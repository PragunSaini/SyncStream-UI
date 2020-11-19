import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Link,
  IconButton,
  Drawer,
} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';

import { useAuth } from '../../utils/authContext';

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
  },
  space: {
    marginRight: theme.spacing(1),
  },
  nav: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  menuButton: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  drawerMain: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  drawer: {
    width: 240,
    display: 'flex',
    paddingTop: theme.spacing(2),
  },
  drawerNav: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    '& > a': {
      marginBottom: theme.spacing(1),
    },
    '& > button': {
      marginBottom: theme.spacing(1),
    },
  },
}));

const MainNav = () => {
  const classes = useStyles();
  const { auth, userData, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const renderNav = () => {
    if (auth) {
      return (
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
      );
    }

    return (
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
    );
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" component="h1" className={classes.title}>
          <Link component={RouterLink} to="/" color="inherit">
            SyncStream
          </Link>
        </Typography>
        <nav className={classes.nav}>{renderNav()}</nav>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerToggle}
          className={classes.menuButton}>
          <MenuIcon />
        </IconButton>
        <Drawer
          open={mobileOpen}
          className={classes.drawerMain}
          classes={{ paper: classes.drawer }}
          anchor="right"
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}>
          <nav className={classes.drawerNav}>{renderNav()}</nav>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default MainNav;
