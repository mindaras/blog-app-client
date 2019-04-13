import { GET_ALL_POSTS, UPDATE_POST, DELETE_POST } from "../actions";

const EMPTY_STRING = "EMPTY_STRING";

const getAllPosts = payload => {
  if (payload && payload.length) {
    return payload.reduce((acc, curr) => {
      const { id, username, author, title, content } = curr;
      acc[id] = {
        id,
        username,
        author,
        title: title === EMPTY_STRING ? "" : title,
        content: content === EMPTY_STRING ? "" : content
      };
      return acc;
    }, {});
  }
};

const updatePost = (state, payload) => {
  const { id, username, author, title, content } = payload;
  return { ...state, [id]: { id, username, author, title, content } };
};

const deletePost = (state, payload) => {
  const newState = { ...state };
  delete newState[payload.id];
  return newState;
};

export default (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_POSTS:
      return getAllPosts(action.payload);
    case UPDATE_POST:
      return updatePost(state, action.payload);
    case DELETE_POST:
      return deletePost(state, action.payload);
    default:
      return state;
  }
};
