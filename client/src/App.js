import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import socketIOClient from 'socket.io-client';

import HomePage from './pages/Home/Home';
import TestPage from './pages/Test/TestContainer';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      endpoint: "http://127.0.0.1:4000",
    }
  }

  componentDidMount() {
    const socket = socketIOClient(this.state.endpoint);
  }

  render() {
    return (
        <Router>
          <Route exact path="/" component={HomePage} />
          <Route path="/test" component={TestPage} />
        </Router>
    );
  }
}

export default App;
