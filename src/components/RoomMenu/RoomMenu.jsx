import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(1),
    display: 'flex',
    flexDirection: 'row',
  },
  button: { flexGrow: 1 },
}));

const RoomMenu = ({ setViewChat }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button
        color="primary"
        onClick={() => setViewChat(false)}
        className={classes.button}>
        Playlist
      </Button>
      <Button
        color="primary"
        onClick={() => setViewChat(true)}
        className={classes.button}>
        Room
      </Button>
      <Button color="primary" className={classes.button}>
        Settings
      </Button>
    </div>
  );
};

RoomMenu.propTypes = {
  setViewChat: PropTypes.func,
};

export default RoomMenu;
