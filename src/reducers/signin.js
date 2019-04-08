import { SIGNIN_USER, REFRESH_SESSION, SIGNOUT_USER } from "../actions";

const initialState = {
  authorized: false,
  error: false,
  username: "",
  errorMessage: ""
};

const clearLocalStorage = () => {
  localStorage.removeItem("username");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

const signinUser = ({ username, accessToken, refreshToken, message }) => {
  if (accessToken) {
    localStorage.setItem("username", username);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    return { authorized: true, error: false, username, errorMessage: "" };
  }

  clearLocalStorage();

  return { authorized: false, error: true, errorMessage: message };
};

const refreshSession = (state, { username, accessToken, refreshToken }) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    return { authorized: true, error: false, username, errorMessage: "" };
  }

  clearLocalStorage();

  return { ...state, authorized: true };
};

const signoutUser = state => {
  clearLocalStorage();

  return { ...state, authorized: false };
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
