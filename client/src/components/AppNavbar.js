import React, { Component, Fragment } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Logout from './Logout';

class AppNavbar extends Component {
  constructor (props) {
    super(props);

    this.state = {
      isOpen: false
    }
  }

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  };

  render() {
    const { isAuthenticated, isLoading, user } = this.props.auth;

    const authLinks = (
      <Fragment>
        <NavItem>
          <NavLink href="#">
            Welcome { user ? `${user.firstname} ${user.lastname}` : "" }
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/chat">
            Chat
          </NavLink>
        </NavItem>
        <NavItem>
          <Logout />
        </NavItem>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <NavItem>
          <NavLink href="/register">
            Register
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/login">
            Login
          </NavLink>
        </NavItem>
      </Fragment>
    );

    return(
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand href="/">
              Mini-Slack
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                { isAuthenticated && !isLoading ? authLinks : guestLinks }
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  auth
});

export default connect(mapStateToProps, null)(AppNavbar);
