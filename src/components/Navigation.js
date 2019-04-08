import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { signoutUser } from "../actions";

class Home extends Component {
  render() {
    return (
      <Navigation>
        <NavLink to="/">Home</NavLink>
        {this.props.authorized ? (
          <Fragment>
            <NavLink to="/new">New post</NavLink>
            <SignOut onClick={this.props.signoutUser}>Sign out</SignOut>
          </Fragment>
        ) : (
          <Fragment>
            <NavLink to="/signup">Sign up</NavLink>
            <NavLink to="/signin">Sign in</NavLink>
          </Fragment>
        )}
      </Navigation>
    );
  }
}

const mapStateToProps = state => ({
  authorized: state.signin.authorized
});

const mapDispatchToProps = { signoutUser };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

const Navigation = styled.div`
  display: flex;
  align-items: center;
`;

const navLinkStyles = `
  display: inline-block;
  text-decoration: none;
  color: #000;
  transition: ease 0.3s;
  &:hover {
    background-color: #000;
    color: #fff;
  }
  border: 1px solid #000;
  padding: 10px 20px;
  margin-bottom: 40px;
  margin-right: 20px;
  cursor: pointer;
`;

const NavLink = styled(Link)`
  ${navLinkStyles}
`;

const SignOut = styled.a`
  ${navLinkStyles}
`;
