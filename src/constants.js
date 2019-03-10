// App variables
export const APP_NAME = 'J360';

// User Actions
export const CAPTURE_COGNITO_USER = 'CAPTURE_COGNITO_USER';
export const CAPTURE_USER = 'CAPTURE_USER';

// User endpoints
export const API_GET_USERS = `${process.env.REACT_APP_API_URL}/api/users`;
export const API_GET_USER = SUB => `${process.env.REACT_APP_API_URL}/api/users/${SUB}`;
export const API_UPDATE_USER = SUB => `${process.env.REACT_APP_API_URL}/api/users/${SUB}`;
export const API_CREATE_USER = `${process.env.REACT_APP_API_URL}/api/users/create`;

// Company Actions
export const CAPTURE_COMPANY = 'CAPTURE_COMPANY';

// Company endpoints
export const API_GET_COMPANY = SUB => `${process.env.REACT_APP_API_URL}/api/company/${SUB}`;
export const API_UPDATE_COMPANY = SUB => `${process.env.REACT_APP_API_URL}/api/company/${SUB}`;
export const API_CREATE_COMPANY = `${process.env.REACT_APP_API_URL}/api/company/create`;

// Location Actions
export const CAPTURE_LOCATIONS = 'CAPTURE_LOCATIONS';
export const CAPTURE_LOCATION = 'CAPTURE_LOCATION';
export const CREATE_LOCATION = 'CREATE_LOCATION';

// Location endpoints
export const API_GET_LOCATIONS = `${process.env.REACT_APP_API_URL}/api/locations`;
export const API_CREATE_LOCATION = `${process.env.REACT_APP_API_URL}/api/locations/create`;

// Shift Actions
export const CAPTURE_SHIFTS = 'CAPTURE_SHIFTS';

// Shift endpoints
export const API_GET_SHIFTS = `${process.env.REACT_APP_API_URL}/api/jobs`;
