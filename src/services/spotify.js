import config from '../config';
import axios from 'axios';
import base64 from 'base-64';

const SPOTIFY_API = 'https://api.spotify.com/v1/';
const SEARCH_API = `${SPOTIFY_API}search?q=`;

// prep for authentication
const secret = `${config.client_id}:${config.client_secret}`;
const auth_url = 'https://accounts.spotify.com/api/token';
const Authorization = `Basic ${base64.encode(secret)}`;

const cfg = {
  headers: {
    "Authorization": Authorization
  }
}

export function authorize(callback) {
  axios.post(auth_url, "grant_type=client_credentials", cfg)
    .then(res => {
      callback({
        headers: {
          Authorization: `Bearer ${res.data.access_token}`
        }
      });
    })
    .catch(error => console.log(error))
}


export function searchArtist(query, credentials, callback) {
  const query_url = `${SEARCH_API}${query}&type=artist&limit=1`;

  axios.get(query_url, credentials)
    .then(res => {
      const artist = res.data.artists.items[0];
      callback({artist})
    })
    .catch(error => console.log(error))
}