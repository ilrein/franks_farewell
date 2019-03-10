import {
  combineReducers,
} from 'redux';

import userReducer from './userReducer';
import companyReducer from './companyReducer';
import locationReducer from './locationReducer';
import shiftsReducer from './shiftsReducer';
import skillsetsReducer from './skillsetsReducer';

const rootReducer = combineReducers({
  userReducer,
  company: companyReducer,
  locations: locationReducer,
  shifts: shiftsReducer,
  skillsets: skillsetsReducer,
});

export default rootReducer;
