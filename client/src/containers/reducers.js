import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import signin from "./SigninPage/reducer";
import layout from "./Layout/reducer";
import branch from "./BranchPage/reducer";

export default history =>
    combineReducers({ router: connectRouter(history), signin, layout, branch });
