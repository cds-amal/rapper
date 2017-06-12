import React, { Component } from 'react';
import './App.css';

import {
  FormGroup,
  FormControl,
  InputGroup,
  Glyphicon
} from 'react-bootstrap';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: ''
    }
  }

  search() {
    const BASE_URL = 'https://api.spotify.com/v1/search?q=';
    const FETCH_URL = BASE_URL + this.state.query + '&type=artist&limit=1';

    console.log('FETCH_URL', FETCH_URL);

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

        <div className="Profile">
          <div>Artist Picture</div>
          <div>Artist Name</div>
        </div>

        <div className="Gallery">
          Gallery
        </div>
      </div>
    );
  }
}

export default App;
