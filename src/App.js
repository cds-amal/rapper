import React, { Component } from 'react';
import './App.css';
import Profile from './profile';

import {
  FormGroup,
  FormControl,
  InputGroup,
  Glyphicon
} from 'react-bootstrap';

import { authorize, searchArtist } from './services/auth';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: '',
      artist: null
    }
  }

  componentDidMount() {
    authorize(
      (credentials) => this.setState({credentials})
    )
  }

  search() {
    searchArtist(
      this.state.query,
      this.state.credentials,
      (artist) => this.setState(artist)
    );
  }

  render() {
    console.log(this.state);
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
