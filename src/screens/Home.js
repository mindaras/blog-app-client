import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAllPosts } from "../actions";

class Home extends Component {
  componentDidMount() {
    this.props.getAllPosts();
  }

  renderPosts = () => {
    return Object.values(this.props.posts).map(({ id, title, content }) => (
      <li key={id}>
        <Link
          to={`/post/${id}`}
          state={{ title, content }}
          style={{ textDecoration: "none", color: "#000" }}
        >
          <h4>{title}</h4>
          <p>
            {content && content.length > 29
              ? `${content.substring(0, 30)}...`
              : content}
          </p>
        </Link>
      </li>
    ));
  };

  render() {
    return (
      <Fragment>
        <h1>Posts</h1>
        <ul>{this.renderPosts()}</ul>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts
});

const mapDispatchToProps = { getAllPosts };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
