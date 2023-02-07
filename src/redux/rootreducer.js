import { combineReducers } from "redux";
import authReducer from "./authentication/reducers";
// import DemoReducer from "./demo/reducers";
import UserReducer from "./users/reducers";
import SeasonReducer from "./seasons/users/reducers";

const rootReducers = combineReducers({
  auth: authReducer,
  ProfileData: authReducer,
  // demoData: DemoReducer,
  user: UserReducer,
  season: SeasonReducer,
});

export default rootReducers;
