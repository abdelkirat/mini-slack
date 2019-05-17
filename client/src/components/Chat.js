import React, { Component } from 'react';
import MessageList from './Chat/MessageList';
import { connect } from 'react-redux';

class Chat extends Component {
  componentDidUpdate() {
    if (!this.props.isAuthenticated) {
      return (
        this.props.history.push('/login')
      );
    }
  }

  render() {
    return (
      <div>
        <MessageList />
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  auth
});

export default connect(mapStateToProps, null)(Chat);
