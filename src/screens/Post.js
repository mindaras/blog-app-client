import React, { Component, Fragment } from "react";
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
    const { post, getPost, match } = this.props;

    if (!post) getPost(match.params.id);
  }

  componentDidUpdate(prevProps) {
    const { title: prevTitle, content: prevContent } = prevProps.post || {};
    const { title, content } = this.props.post || {};

    if (prevTitle !== title || prevContent !== content) {
      this.setState({ title, content });
    }
  }

  onDelete = () => {
    const { deletePost, match, username, idToken, history } = this.props;

    deletePost(match.params.id, username, idToken, history.push);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    const { title, content } = this.state;
    const { updatePost, match, username, name, idToken } = this.props;

    e.preventDefault();

    updatePost(match.params.id, username, name, idToken, title, content);

    this.setState({ updating: false });
  };

  onUpdate = () => {
    this.setState({ updating: true });
  };

  renderButtons = () => {
    const { post, authorized, username } = this.props;

    if (authorized && post.username === username) {
      return (
        <Fragment>
          <UpdateButton onClick={this.onUpdate}>Update</UpdateButton>
          <DeleteButton onClick={this.onDelete}>Delete</DeleteButton>
        </Fragment>
      );
    }
  };

  render() {
    if (!this.props.post) return <div />;

    const { title, content } = this.props.post;

    return (
      <div>
        {this.renderButtons()}
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
  post: state.posts[ownProps.match.params.id],
  authorized: state.signin.authorized,
  username: state.signin.username,
  name: state.signin.name,
  idToken: state.signin.idToken
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
