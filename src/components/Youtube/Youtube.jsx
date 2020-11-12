import React from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  youtubeContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    paddingBottom: '56.25%',
    overflow: 'hidden',
    marginBottom: '50px',
  },
  youtubeIframe: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
}));

const Youtube = () => {
  const classes = useStyles();

  return (
    <YouTube
      videoId="1o84y-5-cO0"
      containerClassName={classes.youtubeContainer}
      className={classes.youtubeIframe}
      opts={{
        width: '100%',
        height: '100%',
        // host: 'https://www.youtube-nocookie.com',
        playerVars: {
          controls: 1,
          disablekb: 1,
          modestbranding: 1,
          rel: 0,
          iv_load_policy: 3,
          playsinline: 1,
          enablejsapi: 1,
        },
      }}
    />
  );
};

export default Youtube;
