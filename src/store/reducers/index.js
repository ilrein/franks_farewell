import {
  combineReducers,
} from 'redux';

function user(state = [], action) {
  switch (action.type) {
    case 'CAPTURE_USER':
      return action.payload;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  user,
});

export default rootReducer;
