import {
  CAPTURE_LOCATIONS,
} from '../../constants';

function companyReducer(state = {
  totalDocs: 0,
}, action) {
  switch (action.type) {
    case CAPTURE_LOCATIONS:
      return action.payload;
    default:
      return state;
  }
}

export default companyReducer;
