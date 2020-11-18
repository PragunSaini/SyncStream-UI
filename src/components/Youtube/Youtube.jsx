import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import { makeStyles, Typography } from '@material-ui/core';

import {
  subscribeLoad,
  startVideo,
  subscribeSync,
  endVideo,
  pauseVideo,
  subscribePauseVideo,
  playVideo,
  subscribePlayVideo,
  removePlayerListeners,
  subscribeCurrent,
  sendCurrentRequest,
} from '../../socket/socket';

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
  novideo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nodisplay: { display: 'none' },
}));

const Youtube = () => {
  const classes = useStyles();
  const [player, setPlayer] = useState(null);
  const [vid, setVid] = useState(null);
  const vidRef = useRef(null);
  const playRef = useRef(null);
  const timeRef = useRef(0);
  const seekRef = useState(null);

  const onReady = e => setPlayer(e.target);

  useEffect(() => {
    console.log(player);
  }, [player]);

  const setPausedSeekChecker = () => {
    timeRef.current = player.getCurrentTime();
    return setInterval(() => {
      if (!playRef.current) {
        if (Math.abs(player.getCurrentTime() - timeRef.current) > 0.5) {
          timeRef.current = player.getCurrentTime();
          console.log(player.getCurrentTime());
          pauseVideo(player.getCurrentTime());
        }
      }
    });
  };

  useEffect(() => {
    if (player) {
      subscribeLoad(data => {
        if (player) {
          setVid(data);
          vidRef.current = data;
          player.loadVideoById(data);
          player.pauseVideo();
          startVideo();
          player.playVideo();
          playRef.current = true;
        }
      });

      subscribeCurrent(data => {
        setVid(data.vid);
        vidRef.current = data.vid;
        player.loadVideoById(data.vid);
        if (data.state === 'PAUSED') {
          player.seekTo(data.time, true);
          playRef.current = false;
          setPausedSeekChecker();
        } else {
          player.playVideo();
          playRef.current = true;
        }
      });

      subscribeSync(data => {
        if (player) {
          if (Math.abs(player.getCurrentTime() - data) > 1) {
            player.seekTo(data, true);
          }
        }
      });

      subscribePauseVideo(data => {
        if (player) {
          player.pauseVideo();
          player.seekTo(data, true);
          playRef.current = false;
          seekRef.current = setPausedSeekChecker();
        }
      });

      subscribePlayVideo(() => {
        if (player) {
          player.playVideo();
          playRef.current = true;
          clearInterval(seekRef.current);
        }
      });

      sendCurrentRequest();

      if (player) {
        player.addEventListener('onStateChange', e => {
          console.log(e.data);
          if (e.data === 0) {
            // video ended
            endVideo(vidRef.current);
          } else if (e.data === 2) {
            // video paused
            pauseVideo(player.getCurrentTime());
            playRef.current = false;
            seekRef.current = setPausedSeekChecker();
          } else if (e.data === 1) {
            // video playing
            if (!playRef.current) {
              playVideo();
              clearInterval(seekRef.current);
              playRef.current = true;
            }
          }
        });
      }
    }
    return () => removePlayerListeners();
  }, [player]);

  // TODO: New player sync, cleanup of unmounting events

  return (
    <>
      {vid === null && (
        <div className={classes.youtubeContainer}>
          <div className={`${classes.youtubeIframe} ${classes.center}`}>
            <Typography variant="h1" component="p">
              No Video
            </Typography>
          </div>
        </div>
      )}
      <YouTube
        // videoId="PYQdRr7ueSs"
        containerClassName={`${classes.youtubeContainer} ${
          vid === null ? classes.nodisplay : ''
        }`}
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
        onReady={onReady}
      />
    </>
  );
};

export default Youtube;
