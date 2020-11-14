import axios from 'axios';

const re = /^(https?:\/\/)?(w{3}\.)?youtu(be\.com|\.be())\/(watch\?)?(?<params>.+)/;
const API_KEY = 'AIzaSyAa-m1dkn5G_SPSTrNF7eG3xvDdADlNo-Y';

const getUrl = videoId =>
  `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails&id=${videoId}&key=${API_KEY}`;

export const getVideoDetails = async videoId => {
  const res = await axios.get(getUrl(videoId));
  if (res.data.items.length === 0) return null;
  return res.data.items[0];
};

export const checkAndExtractId = url => {
  const match = url.match(re)?.groups?.params;
  if (!match) return null;
  const ind = match.indexOf('v=');
  if (ind === -1) {
    return match.slice(0, 11);
  }
  return match.slice(ind + 2, ind + 13);
};
