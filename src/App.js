import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Profile from './profile';

import {
  FormGroup,
  FormControl,
  InputGroup,
  Glyphicon
} from 'react-bootstrap';

import { authorize } from './services/auth';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: '',
      artist: null
    }
  }

  componentDidMount() {
    authorize((credentials) => {
      this.setState({credentials})
      const auth_headers = {
        headers: {
          "Authorization": `Bearer ${credentials.access_token}`
        }
      }
      this.setState({auth_headers})
    })
  }

  search() {
    const BASE_URL = 'https://api.spotify.com/v1/search?q=';
    const query_url = `${BASE_URL}${this.state.query}&type=artist&limit=1`;

    console.log('query_url', query_url);
    console.log(this.state);

    axios.get(query_url, this.state.auth_headers)
      .then(res => {
        const artist = res.data.artists.items[0];
        this.setState({artist})
        console.log('artist', artist)
        console.log(res.data)
      })
      .catch(err => console.log(err))

  }

  render() {
    return (
      <div className="App">
        <div className="App-title">I am a Rapper</div>

        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search for an Artist"
              value={this.state.query}
              onChange={event => this.setState({query: event.target.value})}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  this.search();
                }
              }}
            />
            <InputGroup.Addon
              onClick={() => this.search()}
            >
              <Glyphicon glyph="search"/>

            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        {
          this.state.artist !== null
          ?
          <div>
            <Profile
              artist={this.state.artist}
            />
            <div className="Gallery">
              Gallery
            </div>
          </div>
          : <div></div>
        }
      </div>
    );
  }
}

export default App;
