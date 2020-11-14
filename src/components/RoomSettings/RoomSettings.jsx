import React from 'react';
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
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

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
  },
}));

const RoomSettings = ({ open, setOpen }) => {
  const classes = useStyles();

  return (
    <Dialog onClose={() => setOpen(false)} open={open} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h6">Settings</Typography>
        <IconButton className={classes.closeBtn} onClick={() => setOpen(false)}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Room Name</Typography>
            <InputBase
              placeholder="Enter room name..."
              classes={{ root: classes.input }}
            />
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
                  <TableCell>Add Video</TableCell>
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
                  <TableCell>Seek/Play/Pause</TableCell>
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
                  <TableCell>Promote/Demote</TableCell>
                  <TableCell>
                    <Checkbox />
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
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <Checkbox />
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
};

export default RoomSettings;
