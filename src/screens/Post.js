import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { getPost, updatePost, deletePost } from "../actions";
import { Input, Textarea, Submit } from "../components";

class Post extends Component {
  constructor(props) {
    super(props);

    const { title, content } = this.props.post || {};

    this.state = {
      updating: false,
      title,
      content
    };
  }

  componentDidMount() {
    if (!this.props.post) {
      this.props.getPost(this.props.match.params.id);
    }
  }

  componentDidUpdate(prevProps) {
    const { title: prevTitle, content: prevContent } = prevProps.post || {};
    const { title, content } = this.props.post || {};

    if (prevTitle !== title || prevContent !== content) {
      this.setState({ title, content });
    }
  }

  onDelete = () => {
    this.props.deletePost(this.props.match.params.id);
    this.props.history.push("/");
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    const { title, content } = this.state;

    e.preventDefault();
    this.props.updatePost(this.props.match.params.id, title, content);
  };

  onUpdate = () => {
    this.setState({ updating: true });
  };

  render() {
    if (!this.props.post) return <div />;

    const { title, content } = this.props.post;

    return (
      <div>
        <UpdateButton onClick={this.onUpdate}>Update</UpdateButton>
        <DeleteButton onClick={this.onDelete}>Delete</DeleteButton>
        <h1>{title}</h1>
        <p>{content}</p>
        {this.state.updating && (
          <form onSubmit={this.onSubmit} style={{ marginTop: 40 }}>
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
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  post: state.posts[ownProps.match.params.id]
});

const mapDispatchToProps = { getPost, updatePost, deletePost };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);

const DeleteButton = styled.button`
  padding: 20px 25px;
  background-color: red;
  border: 1px solid red;
  color: #fff;
  border: none;
  max-width: 100px;
  width: 100%;
  margin-right: 20px;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
  transition: ease 0.3s;
  outline: none;
`;

const UpdateButton = styled(DeleteButton)`
  background-color: #fff;
  border: 1px solid #000;
  color: #000;
  &:hover {
    background-color: #000;
    color: #fff;
    opacity: 1;
  }
`;
