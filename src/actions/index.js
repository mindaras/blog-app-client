export const GET_ALL_POSTS = "GET_ALL_POSTS",
  UPDATE_POST = "UPDATE_POST",
  DELETE_POST = "DELETE_POST",
  SIGNUP_USER = "SIGNUP_USER",
  SIGNIN_USER = "SIGNIN_USER",
  SIGNOUT_USER = "SIGNOUT_USER",
  REFRESH_SESSION = "REFRESH_SESSION";

const ROOT_URL = "api.mindaugaslazauskas.com";

const request = (endpoint, method, body) => {
  return fetch(`${ROOT_URL}${endpoint}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  }).then(data => data.json());
};

export const getAllPosts = () => dispatch => {
  request("/allPosts", "GET")
    .then(payload => dispatch({ type: GET_ALL_POSTS, payload }))
    .catch(e => {});
};

export const getPost = id => dispatch => {
  request(`/getPost/${id}`, "GET")
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
  request("/createPost", "POST", {
    username,
    author,
    idToken,
    title,
    content
  })
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
  request("/updatePost", "PUT", {
    id,
    username,
    author,
    idToken,
    title,
    content
  })
    .then(payload => dispatch({ type: UPDATE_POST, payload }))
    .catch(e => {});
};

export const deletePost = (id, username, idToken, redirect) => dispatch => {
  request("/deletePost", "DELETE", { id, username, idToken })
    .then(payload => {
      dispatch({ type: DELETE_POST, payload });
      redirect("/");
    })
    .catch(e => {});
};

export const signupUser = (name, email, password) => dispatch => {
  request("/signup", "POST", { name, password, username: email })
    .then(payload => dispatch({ type: SIGNUP_USER, payload }))
    .catch(e => {});
};

export const signinUser = (username, password) => dispatch => {
  request("/signin", "POST", { username, password })
    .then(payload => dispatch({ type: SIGNIN_USER, payload }))
    .catch(e => {});
};

export const refreshSession = () => dispatch => {
  request("/refreshSession", "POST", {
    username: localStorage.getItem("username"),
    token: localStorage.getItem("refreshToken")
  })
    .then(payload => dispatch({ type: REFRESH_SESSION, payload }))
    .catch(e => {});
};

export const signoutUser = () => ({ type: SIGNOUT_USER });
