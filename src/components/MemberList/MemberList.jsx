import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, makeStyles, Popover, Typography } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import PersonIcon from '@material-ui/icons/Person';
import FaceIcon from '@material-ui/icons/Face';

import {
  promoteMember,
  demoteMember,
  kickMember,
  getSocketId,
} from '../../socket/socket';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(2),
    },
  },
  memberCnt: {
    textAlign: 'center',
    fontWeight: 700,
  },
  memberDiv: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  member: {
    width: '60%',
    margin: theme.spacing(1, 0, 0.5, 0),
    padding: theme.spacing(0.75),
    position: 'relative',
    backgroundColor: theme.palette.grey[200],
    display: 'flex',
    alignItems: 'center',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '100%',
      backgroundColor: theme.palette.primary.main,
      width: '5px',
      height: '100%',
      display: 'block',
    },
  },
  memberConfig: {
    cursor: 'pointer',
    marginLeft: 'auto',
  },
  popover: {
    display: 'flex',
    flexDirection: 'column',
  },
  hidden: {
    visibility: 'hidden',
  },
}));

const MemberList = ({ members }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mkey, setMkey] = useState(null);
  const [myType, setMyType] = useState('Guest');
  const open = Boolean(anchorEl);

  useEffect(() => {
    setMyType(members[getSocketId()].type);
  }, [members]);

  const handlePopoverOpen = (event, memkey) => {
    if (myType === 'Guest') return; // guests cannot access member tools
    setAnchorEl(event.currentTarget);
    setMkey(memkey);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const onPromote = () => {
    promoteMember(mkey);
  };

  const onDemote = () => {
    demoteMember(mkey);
    if (mkey === getSocketId()) handlePopoverClose();
  };

  const onKick = () => {
    handlePopoverClose();
    kickMember(mkey);
  };

  return (
    <div className={classes.root}>
      <Typography className={classes.memberCnt} variant="body1">
        {Object.keys(members).length} Members
      </Typography>
      <div className={classes.memberDiv}>
        {Object.keys(members).map(memkey => (
          <Typography
            // eslint-disable-next-line
            key={memkey}
            className={classes.member}
            variant="body2">
            {members[memkey].name}
            <SettingsIcon
              fontSize="small"
              color="primary"
              className={`${classes.memberConfig} ${
                myType === 'Guest' ? classes.hidden : ''
              }`}
              onClick={e => handlePopoverOpen(e, memkey)}
            />
            {members[memkey].type === 'Owner' && (
              <FaceIcon fontSize="small" color="primary" />
            )}
            {members[memkey].type === 'Mod' && (
              <PersonIcon fontSize="small" color="primary" />
            )}
          </Typography>
        ))}
        <Popover
          className={classes.popover}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
          onClose={handlePopoverClose}>
          <Button
            onClick={onPromote}
            disabled={mkey && members[mkey]?.type !== 'Guest'}>
            Promote
          </Button>
          <Button
            onClick={onDemote}
            disabled={mkey && members[mkey]?.type !== 'Mod'}>
            Demote
          </Button>
          <Button
            onClick={onKick}
            disabled={mkey && members[mkey]?.type === 'Owner'}>
            Kick
          </Button>
        </Popover>
      </div>
    </div>
  );
};

MemberList.propTypes = {
  members: PropTypes.array,
};

export default MemberList;
