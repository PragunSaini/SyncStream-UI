import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Typography, InputBase, fade } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    height: '60vh',
    marginRight: theme.spacing(2),
    backgroundColor: theme.palette.common.white,
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    [theme.breakpoints.down('sm')]: {
      width: '80%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  chats: {
    flexGrow: 1,
    width: '100%',
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    overflowY: 'auto',
    marginBottom: theme.spacing(2),
  },
  typeRoot: {
    marginTop: 'auto',
    alignSelf: 'stretch',
    backgroundColor: fade(theme.palette.grey[300], 0.5),
    '&:hover': {
      backgroundColor: fade(theme.palette.grey[300], 0.7),
    },
    padding: theme.spacing(1),
  },
  noDisplay: {
    display: 'none',
  },
}));

const useItemStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(0.5, 0, 1, 0),
    backgroundColor: fade(theme.palette.grey[400], 0.1),
    padding: theme.spacing(1, 2),
    borderRadius: '0 15px 15px 15px',
  },
  name: {
    fontWeight: theme.typography.fontWeightBold,
    margin: theme.spacing(0.5, 0),
  },
}));

const RoomChat = ({ display }) => {
  const classes = useStyles();

  return (
    <div className={`${classes.root} ${display ? '' : classes.noDisplay}`}>
      <div className={classes.chats}>
        <ChatItem
          msg={{ name: 'Pragun', data: "I'm almost there dude wait for me" }}
        />
        <ChatItem
          msg={{
            name: 'JOJ',
            data:
              'K, I hear you, meet you ate the docks at the end of the next town',
          }}
        />
      </div>
      <InputBase
        classes={{ root: classes.typeRoot }}
        placeholder="Type your message.."
      />
    </div>
  );
};

const ChatItem = ({ msg }) => {
  const classes = useItemStyles();

  return (
    <div className={classes.root}>
      <Typography variant="body2" className={classes.name}>
        {msg.name}
      </Typography>
      <Typography variant="body1">{msg.data}</Typography>
    </div>
  );
};

ChatItem.propTypes = {
  msg: PropTypes.object,
};

RoomChat.propTypes = {
  display: PropTypes.bool,
};

export default RoomChat;
