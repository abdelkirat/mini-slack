import React, { Component } from 'react';
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import { register } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';
import { Redirect, Router } from 'react-router-dom';

class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    msg: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === 'REGISTER_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    if (isAuthenticated) {
      return (
        this.props.history.push('/chat')
      );
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { firstname, lastname, username, password, passwordConfirmation, email } = this.state;
    const newUser = {
      firstname, lastname, username, password, passwordConfirmation, email
    };

    this.props.register(newUser);
  };

  render() {
    return (
      <Container>
        {this.state.msg ? (
          <Alert color="danger">{this.state.msg}</Alert>
        ) : null}
        <Row>
          <Col sm={{ size: 8, offset: 2 }}>
            <Card>
              <CardBody>
                <CardTitle>
                  <h3>Register</h3>
                </CardTitle>
                <Form onSubmit={this.onSubmit}>
                  <FormGroup row>
                    <Col sm={6}>
                      <Label for="firstname">Firstname</Label>
                      <Input id="firstname" onChange={this.onChange} type="text" name="firstname" />
                    </Col>
                    <Col sm={6}>
                      <Label for="lastname">Lastname</Label>
                      <Input id="lastname" onChange={this.onChange} type="text" name="lastname" />
                    </Col>
                  </FormGroup>

                  <FormGroup>
                    <Label for="username">Username</Label>
                    <Input id="username" onChange={this.onChange} type="text" name="username" />
                  </FormGroup>

                  <FormGroup row>
                    <Col sm={6}>
                      <Label for="password">Password</Label>
                      <Input id="password" onChange={this.onChange} type="password" name="password" />
                    </Col>
                    <Col sm={6}>
                      <Label for="password-confirmation">Password confirmation</Label>
                      <Input id="password-confirmation" onChange={this.onChange} type="password" name="passwordConfirmation" />
                    </Col>
                  </FormGroup>

                  <FormGroup>
                    <Label for="email">E-mail</Label>
                    <Input id="email" onChange={this.onChange} type="text" name="email" />
                  </FormGroup>
                  <Button block>Register</Button>
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
  register, clearErrors
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Register);
