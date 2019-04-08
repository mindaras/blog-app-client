import { SIGNUP_USER } from "../actions";

const initialState = {
  pending: false,
  error: false,
  email: "",
  errorMessage: ""
};

const signupUser = ({ username, message }) => {
  if (username) {
    return { pending: true, error: false, email: username, errorMessage: "" };
  }

  return { pending: false, error: true, email: "", errorMessage: message };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_USER:
      return signupUser(action.payload);
    default:
      return state;
  }
};
