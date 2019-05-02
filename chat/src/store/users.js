const GOT_USERS = 'GOT_USERS';
const ADD_USER = 'ADD_USER';
const CLEAR_USERS = 'CLEAR_USERS';

export const gotUsers = (users) => ({ type: GOT_USERS, users });
export const addUser = (user) => ({ type: ADD_USER, user });
export const clearUsers = () => ({ type: CLEAR_USERS });

const reducer = (state = [], action) => {
  switch(action.type) {
    case GOT_USERS:
      return action.users;
    case ADD_USER:
      return [...state, action.user];
    case CLEAR_USERS:
      return [];
    default:
      return state;
  }
}

export default reducer;
