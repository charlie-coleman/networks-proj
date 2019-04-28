const GOT_USER = 'GOT_USER';
const CLEAR_USER = 'CLEAR_USER';

export const gotUser = user => ({ type: GOT_USER, user });
export const clearUser = () => ({ type: CLEAR_USER });

const reducer = (state = {}, action) => {
    switch (action.type) {
        case GOT_USER:
            return action.user;
        case CLEAR_USER:
            return {};
        default:
            return state;
    }
};

export default reducer;