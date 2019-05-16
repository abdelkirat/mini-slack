import React, { Component } from 'react';
import { Button, Col, Container, Form, FormGroup, Input, ListGroup, Row } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import Icon from '@mdi/react';
import { mdiSend } from '@mdi/js';

import { addMessage, getMessages, listenToIncomingMessages } from '../../actions/messageActions';

class MessageList extends Component {
  componentDidMount() {
    this.props.getMessages();
  }

  componentDidUpdate(prevProps) {
    const { socket: oldSocket } = prevProps;
    const { socket: newSocket } = this.props;

    if (newSocket && !oldSocket) {
      this.props.listenToIncomingMessages(newSocket);
    }
    const messagesList = document.getElementById('messages-list');
    messagesList.scrollTop = messagesList.scrollHeight;
  }

  state = {
    message: ''
  };

  styles = {
    input: {
      borderRadius: 0,
      height: 'calc(1.5em + .75rem + 5px)',
      marginTop: '-1px'
    },
    button: {
      borderRadius: 0,
    },
    messages: {
      display: 'flex',
      minHeight: '75vh',
      maxHeight: '75vh',
      overflowX: 'scroll',
      border: '1px solid #ced4da'
    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newMessage = {
      message: this.state.message
    };

    this.setState({ message: '' });
    this.props.addMessage(newMessage, this.props.socket);
  };

  render() {
    const { messages } = this.props;
    const { loading } = messages;

    return (
      <Container>
        <ListGroup id="messages-list" style={this.styles.messages}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <TransitionGroup className="messages-list">
              {messages.map(message => {
                return (
                  <CSSTransition key={message._id} timeout={500} classNames="fade">
                    <div>[{moment(message.createdAt).format('LTS')}] {message.user} - {message.message}</div>
                  </CSSTransition>
                );
              })}
            </TransitionGroup>
          )}

        </ListGroup>
        <Form onSubmit={this.onSubmit}>
          <Row form>
            <Col md={11} style={{ marginRight: 0, paddingRight: 0 }}>
              <FormGroup>
                <Input
                  id="message"
                  style={this.styles.input}
                  type="text"
                  name="message"
                  onChange={this.onChange}
                  value={this.state.message}
                  placeholder="Type your message here..."
                />
              </FormGroup>
            </Col>

            <Col md={1} style={{ marginLeft: 0, paddingLeft: 0 }}>
              <Button
                block
                style={this.styles.button}
              >
                <Icon path={mdiSend}
                      size={1}
                      horizontal
                      vertical
                      rotate={180}
                      color="white"
                />
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = ({ message, socket: socketReducer }) => ({
  messages: message.messages,
  socket: socketReducer.socket
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getMessages, addMessage, listenToIncomingMessages
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
