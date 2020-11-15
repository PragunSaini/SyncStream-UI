import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  InputBase,
  fade,
  Tooltip,
  useMediaQuery,
  Card,
  ClickAwayListener,
  Button,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import { checkAndExtractId, getVideoDetails } from '../../utils/youtube-api';
import { addPlaylistItem } from '../../socket/socket';

const useStyles = makeStyles(theme => ({
  title: {
    width: 'auto',
    marginRight: theme.spacing(2),
    whiteSpace: 'nowrap',
  },
  grow: {
    flexGrow: 0.5,
    [theme.breakpoints.down('sm')]: {
      flexGrow: 1,
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
  rec: {
    position: 'absolute',
    width: '100%',
    top: '110%',
    left: 0,
    backgroundColor: theme.palette.grey[200],
    zIndex: 10,
    padding: theme.spacing(0.5),
    margin: 0,
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  recinfo: {
    marginLeft: theme.spacing(1),
    flexGrow: 1,
  },
  rectitle: {
    fontWeight: theme.typography.fontWeightBold,
  },
}));

const RoomNav = ({ roomTitle, name }) => {
  const classes = useStyles();
  const matches = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const [rec, setRec] = useState(null);
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    setRec(null);
  };

  const handleLinkChange = e => {
    const { value } = e.target;
    if (value.length < 9) {
      setOpen(false);
      return;
    } // too short url bro
    const vid = checkAndExtractId(value);
    if (vid == null || vid.length < 11) {
      setOpen(false);
      return;
    } // no vid detected :(
    getVideoDetails(vid).then(video => {
      setRec(video);
      if (video != null) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    });
  };

  const onAddPlayItem = () => {
    addPlaylistItem({
      name,
      vid: rec.id,
      title: rec.snippet.title,
      thumbUrl: rec.snippet.thumbnails.default.url,
      channelTitle: rec.snippet.channelTitle,
    });
    handleClose();
  };

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Tooltip title={roomTitle}>
          <Typography variant="h6" component="h1" className={classes.title}>
            {matches
              ? roomTitle.slice(0, 8) + (roomTitle.length < 8 ? '' : '..')
              : roomTitle}
          </Typography>
        </Tooltip>
        <div className={`${classes.search} ${classes.grow}`}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Enter youtube link..."
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search video' }}
            onChange={handleLinkChange}
          />
          {open && rec && (
            <ClickAwayListener onClickAway={handleClose}>
              <Card elevation={2} className={classes.rec}>
                <img src={rec.snippet.thumbnails.default.url} alt="thumbnail" />
                <div className={classes.recinfo}>
                  <Typography variant="body1" className={classes.rectitle}>
                    {rec.snippet.title}
                  </Typography>
                  <Typography variant="body2">
                    {rec.snippet.channelTitle}
                  </Typography>
                </div>
                <Button variant="outlined" onClick={onAddPlayItem}>
                  Add
                </Button>
              </Card>
            </ClickAwayListener>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

RoomNav.propTypes = {
  roomTitle: PropTypes.string,
  name: PropTypes.string,
};

export default RoomNav;
