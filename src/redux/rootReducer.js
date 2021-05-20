import { combineReducers } from "redux";
import { authReducer } from "./reducers/authReducer";
import { eventsReducer } from "./reducers/eventsReducer";



export const rootReducer = combineReducers({
  auth: authReducer,
  events:eventsReducer,
});
