import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  InputBase,
  fade,
  Tooltip,
  useMediaQuery,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  title: {
    width: 'auto',
    marginRight: theme.spacing(2),
    whiteSpace: 'nowrap',
  },
  grow: {
    flexGrow: 0.5,
    [theme.breakpoints.down('sm')]: {
      flexGrow: 1,
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

const RoomNav = ({ roomTitle }) => {
  const classes = useStyles();
  const matches = useMediaQuery(theme => theme.breakpoints.down('sm'));

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Tooltip title={roomTitle}>
          <Typography variant="h6" component="h1" className={classes.title}>
            {matches
              ? roomTitle.slice(0, 8) + (roomTitle.length < 8 ? '' : '..')
              : roomTitle}
          </Typography>
        </Tooltip>
        <div className={`${classes.search} ${classes.grow}`}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Enter youtube link..."
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search video' }}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
};

RoomNav.propTypes = {
  roomTitle: PropTypes.string,
};

export default RoomNav;
