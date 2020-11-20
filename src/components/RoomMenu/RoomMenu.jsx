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

const RoomMenu = ({ viewChat, setViewChat, setOpenSettings }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button
        color="primary"
        variant={!viewChat ? 'outlined' : 'text'}
        onClick={() => setViewChat(false)}
        className={classes.button}>
        Playlist
      </Button>
      <Button
        color="primary"
        variant={viewChat ? 'outlined' : 'text'}
        onClick={() => setViewChat(true)}
        className={classes.button}>
        Room Chat
      </Button>
      <Button
        color="primary"
        className={classes.button}
        onClick={() => setOpenSettings(true)}>
        Room Info
      </Button>
    </div>
  );
};

RoomMenu.propTypes = {
  viewChat: PropTypes.bool,
  setViewChat: PropTypes.func,
  setOpenSettings: PropTypes.func,
};

export default RoomMenu;
