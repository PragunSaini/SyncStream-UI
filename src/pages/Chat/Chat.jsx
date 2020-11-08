import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import { sendMessage, subscribe } from '../../socket/socket';
import { useAuth } from '../../utils/authContext';

const Chat = () => {
  const { auth, userData } = useAuth();
  const history = useHistory();
  const [chats, setChats] = useState([]);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    subscribe(data => {
      setChats(chats => [...chats, data]);
    });
  }, []);

  const onSubmit = e => {
    e.preventDefault();
    sendMessage({ name: userData.name, message: msg });
    setMsg('');
  };

  if (!auth) {
    history.push('/');
  }

  return (
    <Container style={{ margin: 8 }}>
      <div>
        {chats.map((chat, ind) => (
          // eslint-disable-next-line
          <div key={ind}>
            <Typography
              variant="body1"
              component="span"
              style={{ marginRight: 8 }}>
              {chat.name}
            </Typography>
            <Typography variant="body2" component="span">
              {chat.message}
            </Typography>
          </div>
        ))}
      </div>
      <form onSubmit={onSubmit}>
        <TextField
          multiline
          type="text"
          name="msg"
          value={msg}
          onChange={e => setMsg(e.target.value)}
          margin="normal"
          fullWidth
          label="Type a message..."
        />
        <Button type="submit" variant="contained" color="secondary">
          Send
        </Button>
      </form>
    </Container>
  );
};

export default Chat;
