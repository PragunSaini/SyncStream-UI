import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    height: '60vh',
    marginRight: theme.spacing(2),
    backgroundColor: theme.palette.common.white,
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
  },
  noDisplay: {
    display: 'none',
  },
}));

const Playlist = ({ display }) => {
  const classes = useStyles();

  return (
    <div className={`${classes.root} ${display ? '' : classes.noDisplay}`}>
      <p>WOW</p>
    </div>
  );
};

Playlist.propTypes = {
  display: PropTypes.bool,
};

export default Playlist;
