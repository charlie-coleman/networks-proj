const GOT_AUTH_ERROR = 'GOT_AUTH_ERROR';
const CLEAR_AUTH_ERROR = 'CLEAR_AUTH_ERROR';

export const gotAuthError = (message) => ({ type: GOT_AUTH_ERROR, message });
export const clearAuthError = () => ({ type: CLEAR_AUTH_ERROR });

const store = (state = "", action) => {
  switch (action.type) {
    case GOT_AUTH_ERROR:
      return action.message;
    case CLEAR_AUTH_ERROR:
      return "";
    default:
      return state;
  }
}

export default store;
