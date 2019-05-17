import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { initSocket } from './actions/socketActions';

import AppNavbar from './components/AppNavbar';
import ChatComponent from './components/Chat';
import LoginComponent from './components/Login';
import RegisterComponent from './components/Register';
import { loadUser } from './actions/authActions';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.initSocket();
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Router>
        <div className="App">
          <AppNavbar />
          <Route exact path="/login" component={LoginComponent} />
          <Route exact path="/register" component={RegisterComponent} />
          <PrivateRoute exact path="/chat" component={ChatComponent} />
        </div>
      </Router>
    );
  }
}

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render = {
        props => localStorage.getItem('token') ?
          (<Component {...props} />) :
          (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location}
              }}
            />
        )
      }
    />
  )
}

const mapDispatchToProps = dispatch => bindActionCreators({
  initSocket
}, dispatch);

export default connect(undefined, mapDispatchToProps)(App);
