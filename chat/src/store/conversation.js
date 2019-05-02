const GOT_CONVERSATION = 'GOT_CONVERSATION';
const CLEAR_CONVERSATION = 'CLEAR_CONVERSATION';

export const gotConversation = (conversation) => ({ type: GOT_CONVERSATION, conversation });
export const clearConversation = () => ({ type: CLEAR_CONVERSATION });

const reducer = (state = {}, action) => {
  switch (action.type) {
    case GOT_CONVERSATION:
      return action.conversation;
    case CLEAR_CONVERSATION:
      return {};
    default:
      return state;
  }
}

export default reducer;
