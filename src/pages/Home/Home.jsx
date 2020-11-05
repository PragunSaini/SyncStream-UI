import React from 'react';
import { Button, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import MainNav from '../../components/MainNav/MainNav';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '512px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  margin: {
    marginBottom: theme.spacing(4),
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <>
      <MainNav />
      <main>
        <Paper className={classes.root}>
          <Typography variant="h4" className={classes.margin}>
            Watch videos together with your friends and family. Create a room
            for free and watch videos in sync.
          </Typography>
          <Button variant="outlined" color="primary">
            <Typography variant="h5">Get Started</Typography>
          </Button>
        </Paper>
      </main>
    </>
  );
};

export default Home;
