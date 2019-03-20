import fetch from 'isomorphic-fetch';

import {
  API_GET_SHIFTS,
} from '../../../constants';

const getShiftsBySpecialist = async (jwtToken, specialistId, page = 1) => {
  try {
    const get = await fetch(`${API_GET_SHIFTS}?specialistId=${specialistId}&page=${page}`, {
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
