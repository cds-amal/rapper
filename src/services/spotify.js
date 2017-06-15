import config from '../config';
import axios from 'axios';
import base64 from 'base-64';

const AUTH_API = process.env.REACT_APP_AUTH_API;
const SPOTIFY_API = process.env.REACT_APP_SPOTIFY_API;

const SEARCH_API = `${SPOTIFY_API}search?q=`;

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

export function searchArtist(query, credentials, cbSuccess, cbFailure) {
  const query_url = `${SEARCH_API}${query}&type=artist&limit=1`;

  axios.get(query_url, credentials)
    .then(res => {
      if (res.data.artists.items.length === 0) {
        cbFailure(`No results for "${query}"`);
      } else {
        const artist = res.data.artists.items[0];
        const top_tracks = `${SPOTIFY_API}artists/${artist.id}/top-tracks?country=US`;

        axios.get(top_tracks, credentials)
          .then(res => {
            const tracks = res.data.tracks.filter(track => track.preview_url);
            cbSuccess({artist, tracks});
          })
          .catch(error => console.log(error))
      }
    })
    .catch(error => console.log(error))
}
