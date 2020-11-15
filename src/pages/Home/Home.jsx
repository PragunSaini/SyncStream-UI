import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Typography, Container, InputBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { createRoom, joinRoom } from '../../utils/api';

import MainNav from '../../components/MainNav/MainNav';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '512px',
    marginTop: theme.spacing(4),
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

const Home = () => {
  const history = useHistory();
  const classes = useStyles();
  const [roomid, setRoomid] = useState('');

  const onCreateRoom = () => {
    createRoom()
      .then(res => history.push(`/room/${res.data.roomid}`))
      .catch(e => console.log(e));
  };

  const onJoinRoom = () => {
    if (roomid.length !== 8) return;
    joinRoom(roomid)
      .then(res => history.push(`/room/${res.data.roomid}`))
      .catch(e => console.log(e));
  };

  return (
    <>
      <MainNav />
      <main>
        <Container className={classes.root}>
          <Typography variant="h4">
            Watch videos together with your friends and family.
          </Typography>
          <Typography variant="h4" className={classes.text}>
            Create a room for free and watch videos in sync.
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            className={classes.createbtn}
            onClick={onCreateRoom}>
            <Typography variant="h5">Create a Room</Typography>
          </Button>
          <Typography variant="h4">OR</Typography>
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
            <Typography variant="h5">Join a Room</Typography>
          </Button>
        </Container>
      </main>
    </>
  );
};

export default Home;
