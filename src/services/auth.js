import config from '../config';
import axios from 'axios';
import base64 from 'base-64';

const secret = `${config.client_id}:${config.client_secret}`;
const auth_url = 'https://accounts.spotify.com/api/token';
const  Authorization = `Basic ${base64.encode(secret)}`;

const cfg = {
  headers: {
    "Authorization": Authorization
  }
}


export function authorize(cb) {
    axios.post(auth_url, "grant_type=client_credentials", cfg)
      .then(res => {
        console.log(res)
        // invoke callback with valid response
        cb(res.data);
      })
      .catch(err =>{
         console.log(err)
       })
}
