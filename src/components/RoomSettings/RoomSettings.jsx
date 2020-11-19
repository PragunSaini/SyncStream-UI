import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  makeStyles,
  IconButton,
  Grid,
  InputBase,
  Checkbox,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Button,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { renameRoom } from '../../socket/socket';

const useStyles = makeStyles(theme => ({
  closeBtn: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  input: {
    backgroundColor: theme.palette.grey[100],
    width: '100%',
    padding: theme.spacing(0, 1),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  info: {
    margin: theme.spacing(4, 0, 1, 0),
  },
  infoDetail: {
    marginTop: theme.spacing(1),
  },
  infoLight: {
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const RoomSettings = ({ open, setOpen, roomTitle, userData, userType }) => {
  const classes = useStyles();
  const [newName, setNewName] = useState('');

  const onRename = () => {
    const data = newName.trim();
    if (data === '') return;
    renameRoom(data);
    setNewName('');
  };

  return (
    <Dialog onClose={() => setOpen(false)} open={open} maxWidth="md" fullWidth>
      <DialogTitle>
        {/* <Typography variant="h6" component="h2"> */}
        {roomTitle} | Settings
        {/* </Typography> */}
        <IconButton className={classes.closeBtn} onClick={() => setOpen(false)}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" component="h3">
              Change Room Name
            </Typography>
            <InputBase
              placeholder="Enter room name"
              classes={{ root: classes.input }}
              value={newName}
              onChange={e => setNewName(e.target.value)}
              disabled={userType === 'Guest'}
            />
            <Button
              color="primary"
              variant="contained"
              size="small"
              onClick={onRename}
              disabled={userType === 'Guest'}>
              Change
            </Button>
            <Typography variant="h5" className={classes.info} component="h3">
              Your Info
            </Typography>
            <Typography
              variant="h6"
              component="p"
              className={classes.infoDetail}>
              Name: <span className={classes.infoLight}>{userData.name}</span>
            </Typography>
            <Typography
              variant="h6"
              component="p"
              className={classes.infoDetail}>
              Username:{' '}
              <span className={classes.infoLight}>{userData.username}</span>
            </Typography>
            <Typography
              variant="h6"
              component="p"
              className={classes.infoDetail}>
              User Type: <span className={classes.infoLight}>{userType}</span>
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Permission</TableCell>
                  <TableCell>Guest</TableCell>
                  <TableCell>Mod</TableCell>
                  <TableCell>Owner</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>View</TableCell>
                  <TableCell>
                    <Checkbox checked />
                  </TableCell>
                  <TableCell>
                    <Checkbox checked />
                  </TableCell>
                  <TableCell>
                    <Checkbox checked />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Add Video</TableCell>
                  <TableCell>
                    <Checkbox disabled />
                  </TableCell>
                  <TableCell>
                    <Checkbox checked />
                  </TableCell>
                  <TableCell>
                    <Checkbox checked />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Seek/Play/Pause</TableCell>
                  <TableCell>
                    <Checkbox disabled />
                  </TableCell>
                  <TableCell>
                    <Checkbox checked />
                  </TableCell>
                  <TableCell>
                    <Checkbox checked />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Promote/Demote</TableCell>
                  <TableCell>
                    <Checkbox disabled />
                  </TableCell>
                  <TableCell>
                    <Checkbox checked />
                  </TableCell>
                  <TableCell>
                    <Checkbox checked />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Kick</TableCell>
                  <TableCell>
                    <Checkbox disabled />
                  </TableCell>
                  <TableCell>
                    <Checkbox disabled />
                  </TableCell>
                  <TableCell>
                    <Checkbox checked />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

RoomSettings.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  roomTitle: PropTypes.string,
  userData: PropTypes.object,
  userType: PropTypes.string,
};

export default RoomSettings;
