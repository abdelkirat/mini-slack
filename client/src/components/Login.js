import React, { Component } from 'react';
import { Button, Card, CardBody, CardTitle, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { login } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';

class Login extends Component {
  state = {
    username: '',
    password: '',
    msg: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      if (error.id === 'LOGIN_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    if (isAuthenticated) {
      this.props.history.push('/chat');
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { username, password } = this.state;

    const user = {
      username,
      password
    };

    this.props.login(user);
  };

  render() {
    return (
      <Container>
        <Row>
          <Col sm={{ size: 6, offset: 3 }}>
            <Card>
              <CardBody>
                <CardTitle>
                  <h3>Login</h3>
                </CardTitle>
                <Form onSubmit={this.onSubmit}>
                  <FormGroup>
                    <Label for="username">Username</Label>
                    <Input id="username" onChange={this.onChange} type="text" name="username" />
                  </FormGroup>

                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input id="password" onChange={this.onChange} type="password" name="password" />
                  </FormGroup>
                  <Button block>Login</Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = ({ auth, error }) => ({
  isAuthenticated: auth.isAuthenticated,
  error
});

const mapDispatchToProps = dispatch => bindActionCreators({
  login, clearErrors
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
