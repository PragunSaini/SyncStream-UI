import axios from 'axios';

const API_KEY = 'AIzaSyAa-m1dkn5G_SPSTrNF7eG3xvDdADlNo-Y';

const getUrl = videoId =>
  `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails&id=${videoId}&key=${API_KEY}`;

export const getVideoDetails = async videoId => {
  return axios.get(getUrl(videoId));
};
