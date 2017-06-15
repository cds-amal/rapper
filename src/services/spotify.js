import config from '../config';
import axios from 'axios';
import base64 from 'base-64';

const SPOTIFY_API = 'https://api.spotify.com/v1/';
// const SPOTIFY_API = '/spotify_api/v1/';
// const auth_url = '/spotify_auth/api/token';
const SEARCH_API = `${SPOTIFY_API}search?q=`;
const AUTH_API = 'https://accounts.spotify.com/api/token';

// prep for authentication
const secret = `${config.client_id}:${config.client_secret}`;
const Authorization = `Basic ${base64.encode(secret)}`;

const cfg = {
  headers: {
    "Authorization": Authorization
  }
}

export function authorize(callback) {
  axios.post(AUTH_API, "grant_type=client_credentials", cfg)
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
      const top_tracks = `${SPOTIFY_API}artists/${artist.id}/top-tracks?country=US`;

      axios.get(top_tracks, credentials)
        .then(res => {
          console.log(res.data)
          callback({artist, tracks: res.data.tracks});
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
}
