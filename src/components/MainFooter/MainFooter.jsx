import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: theme.palette.primary.main,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    fontWeight: theme.typography.fontWeightLight,
    padding: theme.spacing(1, 0, 1, 0),
  },
  item: {
    fontWeight: theme.typography.fontWeightLight,
    color: '#FFFFFF',
    marginRight: theme.spacing(0.5),
  },
}));

const MainFooter = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="body1" className={classes.item}>
        Made by - Pragun Saini
      </Typography>
    </div>
  );
};

export default MainFooter;
