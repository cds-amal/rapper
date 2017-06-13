import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

const Auth = ({ match }) => (
  <div>
    <h3>callback</h3>
  </div>
)

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={App}/>
      <Route path="/callback" component={Auth}/>
    </div>
  </Router>,
  document.getElementById('root')
)
