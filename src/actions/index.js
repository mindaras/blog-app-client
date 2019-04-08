export const GET_ALL_POSTS = "GET_ALL_POSTS",
  UPDATE_POST = "UPDATE_POST",
  DELETE_POST = "DELETE_POST",
  SIGNUP_USER = "SIGNUP_USER",
  SIGNIN_USER = "SIGNIN_USER",
  SIGNOUT_USER = "SIGNOUT_USER",
  REFRESH_SESSION = "REFRESH_SESSION";

export const getAllPosts = () => dispatch => {
  fetch("http://localhost:8000/allPosts", {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  })
    .then(data => data.json())
    .then(payload => dispatch({ type: GET_ALL_POSTS, payload }))
    .catch(e => {});
};

export const getPost = id => dispatch => {
  fetch(`http://localhost:8000/getPost/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  })
    .then(data => data.json())
    .then(payload => dispatch({ type: UPDATE_POST, payload }))
    .catch(e => {});
};

export const updatePost = (id, title, content) => dispatch => {
  fetch("http://localhost:8000/updatePost", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, title, content })
  })
    .then(data => data.json())
    .then(payload => dispatch({ type: UPDATE_POST, payload }))
    .catch(e => {});
};

export const deletePost = (id, title, content) => dispatch => {
  fetch("http://localhost:8000/deletePost", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id })
  })
    .then(data => data.json())
    .then(payload => dispatch({ type: DELETE_POST, payload }))
    .catch(e => {});
};

export const signupUser = (name, email, password) => dispatch => {
  fetch("http://localhost:8000/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, password, username: email })
  })
    .then(data => data.json())
    .then(payload => dispatch({ type: SIGNUP_USER, payload }))
    .catch(e => {});
};

export const signinUser = (username, password) => dispatch => {
  fetch("http://localhost:8000/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  })
    .then(data => data.json())
    .then(payload => dispatch({ type: SIGNIN_USER, payload }))
    .catch(e => {});
};

export const refreshSession = () => dispatch => {
  fetch("http://localhost:8000/refreshSession", {
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
