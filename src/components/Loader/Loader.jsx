// Soure : https://codepen.io/kathykato/pen/YzKGrqd (ported to material-ui)

import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    fontSize: '1rem',
    lineHeight: 1.5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
    minHeight: '100vh',
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  container: {
    position: 'relative',
    transform: 'scale(0.725)',
    '@media (min-width: 48rem)': {
      transform: 'scale(0.725)',
    },
    '@media (min-width: 62rem)': {
      transform: 'scale(0.85)',
    },
  },
  divider: {
    position: 'absolute',
    zIndex: 2,
    top: 65,
    left: 200,
    width: 50,
    height: 15,
    backgroundColor: '#FFFFFF',
  },
  loadingText: {
    position: 'relative',
    fontSize: '3.75rem',
    margin: 0,
    whiteSpace: 'nowrap',
    '&::before': {
      content: '""',
      position: 'absolute',
      zIndex: 1,
      top: 40,
      left: 115,
      width: 6,
      height: 6,
      backgroundColor: '#000000',
      borderRadius: '50%',
      animation: '$dotMove 1800ms cubic-bezier(0.25,0.25,0.75,0.75) infinite',
    },
  },
  letter: {
    display: 'inline-block',
    position: 'relative',
    color: '#000000',
    letterSpacing: 22,
    '&:nth-child(1)': {
      transformOrigin: '100% 70%',
      transform: 'scale(1, 1.1275)',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 22,
        left: 0,
        width: 14,
        height: 36,
        backgroundColor: '#FFFFFF',
        transformOrigin: '100% 0',
        animation:
          '$lineStretch 1800ms cubic-bezier(0.25,0.25,0.75,0.75) infinite',
      },
    },
    '&:nth-child(5)': {
      transformOrigin: '100% 70%',
      animation:
        '$letterStretch 1800ms cubic-bezier(0.25,0.23,0.73,0.75) infinite',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 15,
        left: 2,
        width: 9,
        height: 15,
        backgroundColor: '#FFFFFF',
      },
    },
  },
  '@keyframes dotMove': {
    '0%, 100%': {
      transform: 'rotate(180deg) translate(-110px, -10px) rotate(-180deg)',
    },
    '50%': {
      transform: 'rotate(0deg) translate(-111px, 10px) rotate(0deg)',
    },
  },
  '@keyframes letterStretch': {
    '0%, 100%': {
      transform: 'scale(1, 0.35)',
      transformOrigin: '100% 75%',
    },
    '8%, 28%': {
      transform: 'scale(1, 2.125)',
      transformOrigin: '100% 67%',
    },
    '37%': {
      transform: 'scale(1, 0.875)',
      transformOrigin: '100% 75%',
    },
    '46%': {
      transform: 'scale(1, 1.03)',
      transformOrigin: '100% 75%',
    },
    '50%, 97%': {
      transform: 'scale(1)',
      transformOrigin: '100% 75%',
    },
  },
  '@keyframes lineStretch': {
    '0%, 45%, 70%, 100%': {
      transform: 'scaleY(0.125)',
    },
    '49%': {
      transform: 'scaleY(0.75)',
    },
    '50%': {
      transform: 'scaleY(0.875)',
    },
    '53%': {
      transform: 'scaleY(0.5)',
    },
    '60%': {
      transform: 'scaleY(0)',
    },
    '68%': {
      transform: 'scaleY(0.18)',
    },
  },
}));

const Loader = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.divider} aria-hidden="true"></div>
        <p className={classes.loadingText} aria-label="Loading">
          <span className={classes.letter} aria-hidden="true">
            L
          </span>
          <span className={classes.letter} aria-hidden="true">
            o
          </span>
          <span className={classes.letter} aria-hidden="true">
            a
          </span>
          <span className={classes.letter} aria-hidden="true">
            d
          </span>
          <span className={classes.letter} aria-hidden="true">
            i
          </span>
          <span className={classes.letter} aria-hidden="true">
            n
          </span>
          <span className={classes.letter} aria-hidden="true">
            g
          </span>
        </p>
      </div>
    </div>
  );
};

export default Loader;
