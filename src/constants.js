// App variables
export const APP_NAME = 'J360';

// Actions
export const CAPTURE_COGNITO_USER = 'CAPTURE_COGNITO_USER';
export const CAPTURE_USER = 'CAPTURE_USER';

// User endpoints
export const API_GET_USERS = `${process.env.REACT_APP_API_URL}/api/users`;
export const API_GET_USER = SUB => `${process.env.REACT_APP_API_URL}/api/users/${SUB}`;
export const API_CREATE_USER = `${process.env.REACT_APP_API_URL}/api/users/create`;

// Company endpoints
export const API_GET_COMPANY = SUB => `${process.env.REACT_APP_API_URL}/api/companies/${SUB}`;
