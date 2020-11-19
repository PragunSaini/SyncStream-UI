import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Button, Typography, Container, InputBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { createRoom } from '../../utils/api';

import MainNav from '../../components/MainNav/MainNav';
import MainFooter from '../../components/MainFooter/MainFooter';

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: '100%',
    padding: 0,
    margin: theme.spacing(4, 0, 0, 0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    marginBottom: theme.spacing(10),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  createbtn: {
    marginBottom: theme.spacing(4),
  },
  inputRoot: {
    margin: theme.spacing(4, 0, 2, 0),
    backgroundColor: theme.palette.grey[100],
    '&:active': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  inputInput: {
    fontSize: theme.typography.h4.fontSize,
    textAlign: 'center',
    letterSpacing: '0.1em',
  },
}));

const Home = ({ notify }) => {
  const history = useHistory();
  const classes = useStyles();
  const [roomid, setRoomid] = useState('');

  const onCreateRoom = () => {
    createRoom()
      .then(res => history.push(`/room/${res.data.roomid}`))
      .catch(e => {
        if (e.response.status === 401) notify('Please login first');
        else notify(e.response.data.msg);
      });
  };

  const onJoinRoom = () => {
    const roomId = roomid.trim();
    if (roomId.length !== 8) {
      notify('Room id should be 8 characters long');
      return;
    }
    history.push(`/room/${roomId}`);
  };

  return (
    <>
      <MainNav />
      <Container className={classes.root}>
        <Typography variant="h4" component="h2">
          Watch videos together with your friends and family.
        </Typography>
        <Typography variant="h4" component="h2" className={classes.text}>
          Create a room for free and watch videos in sync.
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          className={classes.createbtn}
          onClick={onCreateRoom}>
          <Typography variant="h5" component="span">
            Create a Room
          </Typography>
        </Button>
        <Typography variant="h4" component="p">
          OR
        </Typography>
        <InputBase
          value={roomid}
          onChange={e => setRoomid(e.target.value)}
          classes={{ root: classes.inputRoot, input: classes.inputInput }}
          placeholder="Enter roomid"
        />
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          onClick={onJoinRoom}>
          <Typography variant="h5" component="span">
            Join a Room
          </Typography>
        </Button>
      </Container>
      <MainFooter />
    </>
  );
};

Home.propTypes = {
  notify: PropTypes.func,
};

export default Home;
