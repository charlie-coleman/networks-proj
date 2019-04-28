const GOT_RECEIVER = 'GOT_RECEIVER';
const CLEAR_RECEIVER = 'CLEAR_RECEIVER';

export const gotReceiver = receiver => ({ type: GOT_RECEIVER, receiver });
export const clearReceiver = () => ({type: CLEAR_RECEIVER });

const reducer = (state = {}, action) => {
    switch (action.type) {
        case GOT_RECEIVER:
            return action.receiver;
        case CLEAR_RECEIVER:
            return {};
        default:
            return state;
    }
};

export default reducer;