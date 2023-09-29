import axios from 'axios';
import Service from 'ahmad/config/service';
import nookies from 'nookies';

export const getUser = () => {
  const token = nookies.get().token;
  return axios.get(`${Service.API}/user/getAll`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
};
