import React, { useState } from 'react';
import { Button, makeStyles, Popover, Typography } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';

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
}));

const members = ['Pragun Saini', 'Ripunjay Saini'];

const MemberList = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handlePopoverOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <Typography className={classes.memberCnt} variant="body1">
        0 Members
      </Typography>
      <div className={classes.memberDiv}>
        {members.map((member, i) => (
          <Typography
            // eslint-disable-next-line
            key={i}
            className={classes.member}
            variant="body2">
            {member}
            <SettingsIcon
              fontSize="small"
              color="primary"
              className={classes.memberConfig}
              onClick={handlePopoverOpen}
            />
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
          <Button>Promote</Button>
          <Button disabled>Demote</Button>
          <Button>Kick</Button>
        </Popover>
      </div>
    </div>
  );
};

export default MemberList;
