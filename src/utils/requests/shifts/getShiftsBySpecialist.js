import fetch from 'isomorphic-fetch';

import {
  API_GET_SHIFTS,
} from '../../../constants';

const getShiftsBySpecialist = async (jwtToken, specialistId) => {
  try {
    const get = await fetch(`${API_GET_SHIFTS}?specialistId=${specialistId}`, {
      headers: {
        'Content-Type': 'application/json',
        'jwt-token': jwtToken,
      },
    });

    const result = await get.json();
    return result;
  } catch (error) {
    return error;
  }
};

export default getShiftsBySpecialist;
