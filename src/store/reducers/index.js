import {
  combineReducers,
} from 'redux';

import userReducer from './userReducer';
import companyReducer from './companyReducer';
import locationReducer from './locationReducer';
import shiftsReducer from './shiftsReducer';

const rootReducer = combineReducers({
  userReducer,
  company: companyReducer,
  locations: locationReducer,
  shifts: shiftsReducer,
});

export default rootReducer;
