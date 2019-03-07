import {
  CAPTURE_COMPANY,
} from '../../constants';

function companyReducer(state = {
  company: {},
}, action) {
  switch (action.type) {
    case CAPTURE_COMPANY:
      return {
        ...state,
        company: action.payload,
      };
    default:
      return state;
  }
}

export default companyReducer;
