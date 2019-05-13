import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import socketIOClient from 'socket.io-client';

import HomePage from './pages/Home/Home';
import './App.css';

class App extends Component {
  constructor () {
    super();

    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:4000",
    }
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);

    socket.on('connection', () => {
      console.log('connected');
    })
  }

  render() {
    return (
        <Router>
          <Route exact path="/" component={HomePage} />
        </Router>
    );
  }
}

export default App;
