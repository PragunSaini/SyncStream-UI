import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';

import Youtube from '../../components/Youtube/Youtube';
import RoomNav from '../../components/RoomNav/RoomNav';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    overflowX: 'hidden',
  },
  title: {
    padding: theme.spacing(2),
    fontWeight: 500,
  },
}));

const Stream = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <RoomNav roomTitle="My awesome room is tha " />
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Youtube />
        </Grid>
        <Grid item xs={12} md={4}>
          <div>chat here :)</div>
          <div>chat here :)</div>
          <div>chat here :)</div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Stream;
