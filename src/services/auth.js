import config from '../config';
import axios from 'axios';
import querystring from 'querystring';

const params = {
  response_type: 'token',
  redirect_uri: 'https://fathomless-earth-50657.herokuapp.com/callback',
  client_id: config.client_id
}
const base_url = 'https://accounts.spotify.com/authorize';

const auth_url = `${base_url}?${querystring.stringify(params)}`;

export function authorize() {
  console.log(process.env)
    console.log(auth_url);

    axios.get(auth_url)
      .then(res => console.log(res))
      .catch(err =>{
         console.log('axios farted')
         console.log(err)
       })
}
