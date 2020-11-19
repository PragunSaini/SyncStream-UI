import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';
import { Grid, makeStyles } from '@material-ui/core';

import { useAuth } from '../../utils/authContext';
import {
  joinRoom,
  leaveRoom,
  subscribeNewJoin,
  subscribeMemberExit,
  subscribeRoomInfo,
  subscribePlayAdd,
  subscribePlayDelete,
  subscribePlayDown,
  subscribePlayUp,
  subscribeDemote,
  subscribePromote,
  subscribeKick,
  subscribeRename,
  getSocketId,
  subscribeNewOwner,
} from '../../socket/socket';

import { joinRoom as joinRoomRequest } from '../../utils/api';

import Youtube from '../../components/Youtube/Youtube';
import RoomNav from '../../components/RoomNav/RoomNav';
import RoomMenu from '../../components/RoomMenu/RoomMenu';
import RoomChat from '../../components/RoomChat/RoomChat';
import Playlist from '../../components/Playlist/Playlist';
import MemberList from '../../components/MemberList/MemberList';
import RoomSettings from '../../components/RoomSettings/RoomSettings';
import Loader from '../../components/Loader/Loader';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    overflowX: 'hidden',
  },
  main: {
    marginTop: theme.spacing(2),
  },
  videoDiv: {
    padding: theme.spacing(0, 5, 0, 5),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0, 2, 0, 2),
    },
  },
}));

const Room = ({ notify }) => {
  const classes = useStyles();
  const { roomid } = useParams();
  const history = useHistory();
  const { auth, userData } = useAuth();

  const [joined, setJoined] = useState(false);
  const [roomInfo, setRoomInfo] = useState(null);
  const [viewChat, setViewChat] = useState(true);
  const [openSettings, setOpenSettings] = useState(false);

  useEffect(() => {
    if (!auth) {
      notify('Please login first');
      history.push('/');
    } else {
      joinRoomRequest(roomid)
        .then(() => {
          setJoined(true);
        })
        .catch(() => {
          notify('This room does not exist');
          history.push('/');
        });
    }
  }, []);

  useEffect(() => {
    if (joined) {
      // Subscribe to socket events
      subscribeRoomInfo(data => setRoomInfo(data));

      subscribeNewJoin(data =>
        setRoomInfo(roominfo => ({
          ...roominfo,
          members: { ...roominfo.members, [data.socketid]: data },
        }))
      );

      subscribeMemberExit(data =>
        setRoomInfo(roominfo => {
          const temp = { ...roominfo };
          delete temp.members[data];
          return temp;
        })
      );

      subscribePromote(data =>
        setRoomInfo(roominfo => ({
          ...roominfo,
          members: {
            ...roominfo.members,
            [data]: { ...roominfo.members[data], type: 'Mod' },
          },
        }))
      );

      subscribeDemote(data =>
        setRoomInfo(roominfo => ({
          ...roominfo,
          members: {
            ...roominfo.members,
            [data]: { ...roominfo.members[data], type: 'Guest' },
          },
        }))
      );

      subscribePlayAdd(data =>
        setRoomInfo(roominfo => ({
          ...roominfo,
          playlist: [...roominfo.playlist, data],
        }))
      );

      subscribePlayDelete(data =>
        setRoomInfo(roominfo => ({
          ...roominfo,
          playlist: roominfo.playlist.filter(play => play.id !== data),
        }))
      );

      subscribePlayUp(data =>
        setRoomInfo(roominfo => {
          const playlist = [...roominfo.playlist];
          const ind = playlist.findIndex(item => item.id === data);
          if (ind === 0) return playlist;
          [playlist[ind], playlist[ind - 1]] = [
            playlist[ind - 1],
            playlist[ind],
          ];
          return { ...roominfo, playlist };
        })
      );

      subscribePlayDown(data =>
        setRoomInfo(roominfo => {
          const playlist = [...roominfo.playlist];
          const ind = playlist.findIndex(item => item.id === data);
          if (ind === playlist.length - 1) return playlist;
          [playlist[ind], playlist[ind + 1]] = [
            playlist[ind + 1],
            playlist[ind],
          ];
          return { ...roominfo, playlist };
        })
      );

      subscribeKick(() => {
        notify('You have been kicked from this room');
        history.push('/');
      });

      subscribeRename(data => {
        setRoomInfo(roominfo => ({ ...roominfo, name: data }));
      });

      subscribeNewOwner(data => {
        setRoomInfo(roominfo => ({
          ...roominfo,
          members: {
            ...roominfo.members,
            [data]: { ...roominfo.members[data], type: 'Owner' },
          },
        }));
      });

      // Send room joining event
      joinRoom(roomid, {
        username: userData.username,
        name: userData.name,
        id: userData.id,
      });
    }

    // Leave room on unmounting
    return () => {
      if (joined) leaveRoom();
    };
  }, [joined]);

  if (!joined || !roomInfo) {
    return <Loader />;
  }

  return (
    <div className={classes.root}>
      <RoomNav
        roomTitle={roomInfo.name}
        name={userData.name}
        disabled={roomInfo && roomInfo.members[getSocketId()].type === 'Guest'}
      />
      <Grid container spacing={2} className={classes.main}>
        <Grid item xs={12} md={8} lg={9}>
          <div className={classes.videoDiv}>
            <Youtube />
          </div>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <RoomMenu
            setViewChat={setViewChat}
            setOpenSettings={setOpenSettings}
          />
          <Playlist display={!viewChat} playlist={roomInfo.playlist} />
          <RoomChat display={viewChat} name={userData.name} />
          <MemberList members={roomInfo.members} />
          <RoomSettings
            open={openSettings}
            setOpen={setOpenSettings}
            roomTitle={roomInfo.name}
            userData={userData}
            userType={roomInfo ? roomInfo.members[getSocketId()].type : 'Guest'}
          />
        </Grid>
      </Grid>
    </div>
  );
};

Room.propTypes = {
  notify: PropTypes.func,
};

export default Room;
