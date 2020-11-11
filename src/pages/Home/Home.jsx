import React from 'react';
import { Button, Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import MainNav from '../../components/MainNav/MainNav';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '512px',
    marginTop: theme.spacing(4),
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
        <Container className={classes.root}>
          <Typography variant="h4" className={classes.margin}>
            Watch videos together with your friends and family. Create a room
            for free and watch videos in sync.
          </Typography>
          <Button variant="outlined" color="primary">
            <Typography variant="h5">Get Started</Typography>
          </Button>
        </Container>
      </main>
    </>
  );
};

export default Home;
