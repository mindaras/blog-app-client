export const GET_ALL_POSTS = "GET_ALL_POSTS",
  UPDATE_POST = "UPDATE_POST",
  DELETE_POST = "DELETE_POST",
  SIGNUP_USER = "SIGNUP_USER",
  SIGNIN_USER = "SIGNIN_USER",
  SIGNOUT_USER = "SIGNOUT_USER",
  REFRESH_SESSION = "REFRESH_SESSION";

const ROOT_URL = "ec2-3-120-138-39.eu-central-1.compute.amazonaws.com:8000";

export const getAllPosts = () => dispatch => {
  fetch(`${ROOT_URL}/allPosts`, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  })
    .then(data => data.json())
    .then(payload => dispatch({ type: GET_ALL_POSTS, payload }))
    .catch(e => {});
};

export const getPost = id => dispatch => {
  fetch(`${ROOT_URL}/getPost/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  })
    .then(data => data.json())
    .then(payload => dispatch({ type: UPDATE_POST, payload }))
    .catch(e => {});
};

export const createPost = (
  username,
  author,
  idToken,
  title,
  content,
  redirect
) => dispatch => {
  fetch(`${ROOT_URL}/createPost`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, author, idToken, title, content })
  })
    .then(data => data.json())
    .then(payload => redirect(`/post/${payload.id}`))
    .catch(e => {});
};

export const updatePost = (
  id,
  username,
  author,
  idToken,
  title,
  content
) => dispatch => {
  fetch(`${ROOT_URL}/updatePost`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, username, author, idToken, title, content })
  })
    .then(data => data.json())
    .then(payload => dispatch({ type: UPDATE_POST, payload }))
    .catch(e => {});
};

export const deletePost = (id, username, idToken, redirect) => dispatch => {
  fetch(`${ROOT_URL}/deletePost`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, username, idToken })
  })
    .then(data => data.json())
    .then(payload => {
      dispatch({ type: DELETE_POST, payload });
      redirect("/");
    })
    .catch(e => {});
};

export const signupUser = (name, email, password) => dispatch => {
  fetch(`${ROOT_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, password, username: email })
  })
    .then(data => data.json())
    .then(payload => dispatch({ type: SIGNUP_USER, payload }))
    .catch(e => {});
};

export const signinUser = (username, password) => dispatch => {
  fetch(`${ROOT_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  })
    .then(data => data.json())
    .then(payload => dispatch({ type: SIGNIN_USER, payload }))
    .catch(e => {});
};

export const refreshSession = () => dispatch => {
  fetch(`${ROOT_URL}/refreshSession`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: localStorage.getItem("username"),
      token: localStorage.getItem("refreshToken")
    })
  })
    .then(data => data.json())
    .then(payload => dispatch({ type: REFRESH_SESSION, payload }))
    .catch(e => {});
};

export const signoutUser = () => ({ type: SIGNOUT_USER });
