// App variables
export const APP_NAME = 'J360';

// Actions
export const CAPTURE_COGNITO_USER = 'CAPTURE_COGNITO_USER';
export const CAPTURE_USER = 'CAPTURE_USER';

// Endpoints
export const API_GET_USERS = `${process.env.REACT_APP_API_URL}/api/users`;
export const API_GET_USER = ID => `${process.env.REACT_APP_API_URL}/api/users/${ID}`;
export const API_CREATE_USER = `${process.env.REACT_APP_API_URL}/api/users/create`;