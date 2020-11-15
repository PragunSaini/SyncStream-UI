import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Typography, IconButton } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import DeleteIcon from '@material-ui/icons/Delete';

import {
  deletePlaylistItem,
  movePlaylistItemDown,
  movePlaylistItemUp,
} from '../../socket/socket';

const useStyles = makeStyles(theme => ({
  root: {
    height: '60vh',
    marginRight: theme.spacing(2),
    backgroundColor: theme.palette.common.white,
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(1),
    overflowY: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: '80%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  noDisplay: {
    display: 'none',
  },
}));

const useItemStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: theme.palette.grey[200],
    '&:hover': {
      backgroundColor: theme.palette.grey[100],
    },
    marginBottom: theme.spacing(1),
  },
  img: {
    marginRight: theme.spacing(1),
  },
  infodiv: {
    flexGrow: 1,
    padding: theme.spacing(1),
    position: 'relative',
  },
  title: {
    fontWeight: theme.typography.fontWeightBold,
    marginBottom: theme.spacing(1),
  },
  actionDiv: {
    padding: theme.spacing(0, 1),
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  addedBy: {
    marginLeft: 'auto',
    color: theme.palette.grey[600],
  },
  noDisplay: {
    display: 'none',
  },
}));

const Playlist = ({ display, playlist }) => {
  const classes = useStyles();

  return (
    <div className={`${classes.root} ${display ? '' : classes.noDisplay}`}>
      {playlist.map(playitem => (
        <PlaylistItem item={playitem} key={playitem.id} />
      ))}
    </div>
  );
};

const PlaylistItem = ({ item }) => {
  const classes = useItemStyles();
  const [show, setShow] = useState(false);

  const onHover = () => setShow(true);
  const onHoverOut = () => setShow(false);

  return (
    <div
      className={classes.root}
      onMouseEnter={onHover}
      onMouseLeave={onHoverOut}>
      <img
        src={item.thumbUrl}
        alt={`Thumbnail for ${item.title}`}
        className={classes.img}
      />
      <div className={classes.infodiv}>
        <Typography variant="body1" className={classes.title}>
          {item.title}
        </Typography>
        <Typography variant="body2">{item.channelTitle}</Typography>

        <div
          className={`${classes.actionDiv} ${show ? '' : classes.noDisplay}`}>
          <IconButton size="small" onClick={() => movePlaylistItemUp(item.id)}>
            <ExpandLessIcon color="secondary" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => movePlaylistItemDown(item.id)}>
            <ExpandMoreIcon color="secondary" />
          </IconButton>
          <IconButton size="small" onClick={() => deletePlaylistItem(item.id)}>
            <DeleteIcon color="secondary" />
          </IconButton>
          <Typography variant="body2" className={classes.addedBy}>
            {item.name}
          </Typography>
        </div>
      </div>
    </div>
  );
};

PlaylistItem.propTypes = {
  item: PropTypes.object,
};

Playlist.propTypes = {
  display: PropTypes.bool,
  playlist: PropTypes.array,
};

export default Playlist;
