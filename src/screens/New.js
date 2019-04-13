import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { createPost } from "../actions";

class New extends Component {
  state = {
    title: "",
    content: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    const { title, content } = this.state;
    const { createPost, username, name, idToken, history } = this.props;

    e.preventDefault();

    createPost(username, name, idToken, title, content, history.push);
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <Input
          name="title"
          placeholder="Title"
          value={this.state.title}
          onChange={this.onChange}
        />
        <Textarea
          name="content"
          placeholder="Content"
          value={this.state.content}
          onChange={this.onChange}
        />
        <Submit type="submit" />
      </form>
    );
  }
}

const mapStateToProps = state => ({
  username: state.signin.username,
  name: state.signin.name,
  idToken: state.signin.idToken
});

const actionsToProps = { createPost };

export default connect(
  mapStateToProps,
  actionsToProps
)(New);

const Input = styled.input`
  border: 1px solid #000;
  padding: 10px 15px;
  display: block;
  max-width: 500px;
  width: 100%;
  margin-bottom: 10px;
  outline: none;
`;

const Textarea = styled.textarea`
  max-width: 500px;
  width: 100%;
  border: 1px solid #000;
  display: block;
  padding: 10px 15px;
  min-height: 400px;
  resize: none;
  outline: none;
  margin-bottom: 20px;
`;

const Submit = styled.input`
  border: 1px solid #000;
  padding: 10px 20px;
  &:hover {
    background-color: #000;
    color: #fff;
  }
  transition: ease 0.3s;
  cursor: pointer;
  min-width: 250px;
  outline: none;
`;
