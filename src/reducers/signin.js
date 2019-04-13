import { SIGNIN_USER, REFRESH_SESSION, SIGNOUT_USER } from "../actions";

const initialState = {
  authorized: false,
  error: false,
  username: "",
  name: "",
  idToken: "",
  errorMessage: ""
};

const clearLocalStorage = () => {
  localStorage.removeItem("username");
  localStorage.removeItem("refreshToken");
};

const signinUser = ({ username, name, idToken, refreshToken, message }) => {
  if (idToken) {
    localStorage.setItem("username", username);
    localStorage.setItem("refreshToken", refreshToken);

    return {
      authorized: true,
      error: false,
      username,
      name,
      idToken,
      errorMessage: ""
    };
  }

  clearLocalStorage();

  return { authorized: false, error: true, errorMessage: message };
};

const refreshSession = (state, { username, name, idToken, refreshToken }) => {
  if (idToken) {
    localStorage.setItem("refreshToken", refreshToken);

    return {
      authorized: true,
      error: false,
      username,
      name,
      idToken,
      errorMessage: ""
    };
  }

  clearLocalStorage();

  return { ...state, authorized: false };
};

const signoutUser = state => {
  clearLocalStorage();

  return { ...state, authorized: false, username: "", name: "", idToken: "" };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_USER:
      return signinUser(action.payload);
    case REFRESH_SESSION:
      return refreshSession(state, action.payload);
    case SIGNOUT_USER:
      return signoutUser(state);
    default:
      return state;
  }
};
