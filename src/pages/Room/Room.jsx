import React, { useState } from 'react';
import { Grid, makeStyles } from '@material-ui/core';

import Youtube from '../../components/Youtube/Youtube';
import RoomNav from '../../components/RoomNav/RoomNav';
import RoomMenu from '../../components/RoomMenu/RoomMenu';
import RoomChat from '../../components/RoomChat/RoomChat';
import Playlist from '../../components/Playlist/Playlist';
import MemberList from '../../components/MemberList/MemberList';
import RoomSettings from '../../components/RoomSettings/RoomSettings';

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

const Room = () => {
  const classes = useStyles();
  const [viewChat, setViewChat] = useState(true);
  const [openSettings, setOpenSettings] = useState(false);

  return (
    <div className={classes.root}>
      <RoomNav roomTitle="Test Room" />
      <Grid container spacing={2} className={classes.main}>
        <Grid item xs={12} md={8} lg={9}>
          <div className={classes.videoDiv}>
            <Youtube />
          </div>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <RoomMenu
            setViewChat={setViewChat}
            setOpenSettings={setOpenSettings}
          />
          <Playlist display={!viewChat} />
          <RoomChat display={viewChat} />
          <MemberList />
          <RoomSettings open={openSettings} setOpen={setOpenSettings} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Room;
