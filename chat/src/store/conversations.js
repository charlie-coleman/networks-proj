const GOT_CONVERSATIONS = 'GOT_CONVERSATIONS';
const ADD_CONVERSATION = 'ADD_CONVERSATION';
const CLEAR_CONVERSATIONS = 'CLEAR_CONVERSATIONS';

export const gotConversations = (conversations) => ({ type: GOT_CONVERSATIONS, conversations });
export const addConversation = (conversation) => ({ type: ADD_CONVERSATION, conversation });
export const clearConversations = () => ({ type: CLEAR_CONVERSATIONS });

const reducer = (state = [], action) => {
  switch (action.type) {
    case GOT_CONVERSATIONS:
      return action.conversations;
    case ADD_CONVERSATION:
      return [...state, action.conversation];
    case CLEAR_CONVERSATIONS:
      return [];
    default:
      return state;
  }
}

export default reducer;
