import { combineReducers } from 'redux';

import UserReducer from 'config/slices/user';

const rootReducer = combineReducers({
  UserReducer,
});

export default rootReducer;
