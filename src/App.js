import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { New, Home, Post, Signup, Signin } from "./screens";
import { Navigation } from "./components";
import { refreshSession } from "./actions";

class App extends Component {
  componentDidMount() {
    if (localStorage.getItem("refreshToken")) this.props.refreshSession();
  }

  render() {
    return (
      <Container>
        <Navigation />
        <Switch>
          <Route path="/post/:id" component={Post} />
          <Route path="/new" component={New} />
          <Route path="/signup" component={Signup} />
          <Route path="/signin" component={Signin} />
          <Route path="/" component={Home} />
        </Switch>
      </Container>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = { refreshSession };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

const Container = styled.div`
  padding: 20px 25px;
  font-family: sans-serif;
`;
