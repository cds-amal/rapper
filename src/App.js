import React, { Component } from 'react';
import './App.css';
import Profile from './profile';
import Gallery from './gallery';

import {
  Alert,
  Fade,
  FormGroup,
  FormControl,
  InputGroup,
  Glyphicon
} from 'react-bootstrap';

import { authorize, searchArtist } from './services/spotify';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: '',
      artist: null,
      searchError: null
    }
  }

  componentDidMount() {
    authorize(
      (credentials) => this.setState({credentials})
    )
  }

  search() {
    const success = (artistInfo)   => this.setState(artistInfo);
    const failure = (searchError) => this.setState({searchError})
    searchArtist(
      this.state.query,
      this.state.credentials,
      success,
      failure
    );
  }

  render() {
    return (
      <div className="App">
        <div className="App-title">Club 7300 Preview Spot</div>

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
          <Fade
            in={this.state.searchError !== null}
          >
            <Alert
              bsStyle="warning"
              onMouseOver={() => this.setState({searchError: null})}
            >
              <strong>{this.state.searchError}</strong>
            </Alert>
          </Fade>
        </FormGroup>
        {
          this.state.artist !== null
          ?
          <div>
            <Profile
              artist={this.state.artist}
            />
            <Gallery
              tracks={this.state.tracks}
            />
          </div>
          : <div></div>
        }
      </div>
    );
  }
}

export default App;
