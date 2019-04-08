import { combineReducers } from "redux";
import posts from "./posts";
import signup from "./signup";
import signin from "./signin";

export default combineReducers({ posts, signup, signin });
