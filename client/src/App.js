import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { initSocket } from './actions/socketActions';

import AppNavbar from './components/AppNavbar';
import ChatComponent from './components/Chat';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.initSocket();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <AppNavbar />
          <Route exact path="/chat" component={ChatComponent} />
        </div>
      </Router>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  initSocket
}, dispatch);

export default connect(undefined, mapDispatchToProps)(App);
