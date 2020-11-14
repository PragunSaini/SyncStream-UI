import React, { useState } from 'react';
import { Grid, makeStyles } from '@material-ui/core';

import Youtube from '../../components/Youtube/Youtube';
import RoomNav from '../../components/RoomNav/RoomNav';
import RoomMenu from '../../components/RoomMenu/RoomMenu';
import RoomChat from '../../components/RoomChat/RoomChat';
import Playlist from '../../components/Playlist/Playlist';
import MemberList from '../../components/MemberList/MemberList';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    overflowX: 'hidden',
  },
  main: {
    marginTop: theme.spacing(2),
  },
  videoDiv: {
    padding: theme.spacing(0, 5, 0, 5),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0, 2, 0, 2),
    },
  },
}));

const Stream = () => {
  const classes = useStyles();
  const [viewChat, setViewChat] = useState(true);

  return (
    <div className={classes.root}>
      <RoomNav roomTitle="My awesome room is tha " />
      <Grid container spacing={2} className={classes.main}>
        <Grid item xs={12} md={9}>
          <div className={classes.videoDiv}>
            <Youtube />
          </div>
        </Grid>
        <Grid item xs={12} md={3}>
          <RoomMenu setViewChat={setViewChat} />
          <Playlist display={!viewChat} />
          <RoomChat display={viewChat} />
          <MemberList />
        </Grid>
      </Grid>
    </div>
  );
};

export default Stream;

// TODO: 1) Make settings dialog, 2) Make new shit responsive
