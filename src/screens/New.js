import React, { Component } from "react";
import styled from "styled-components";

class New extends Component {
  state = {
    title: "",
    content: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    fetch("http://localhost:8000/putPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: this.state.title,
        content: this.state.content
      })
    }).catch(e => {});
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

export default New;

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
