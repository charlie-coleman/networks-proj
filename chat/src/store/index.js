import { createStore, combineReducers } from 'redux';

import messages, { gotMessages, gotNewMessage, clearMessages } from './messages';
import user, { gotUser, clearUser } from './user';
import conversations, { gotConversations, addConversation, clearConversations } from './conversations';
import users, { gotUsers, addUser, clearUsers } from './users';
import conversation, { gotConversation, clearConversation } from './conversation';
import autherror, { gotAuthError, clearAuthError } from './autherror';

import socket from './socket';

const reducers = combineReducers({ messages, user, users, conversation, conversations, autherror });

const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

socket.on('priorMessages', messages => {
    store.dispatch(gotMessages(messages));
});

socket.on('authsuccess', user => {
  store.dispatch(gotUser(user));
  store.dispatch(clearAuthError());
});

socket.on('incomingMessage', message => {
  if(message.conversationId === store.getState().conversation.id)
    store.dispatch(gotNewMessage(message));
});

socket.on('authfailed', message => {
  store.dispatch(gotAuthError(message));
})

socket.on('conversation', conversation => {
  store.dispatch(gotConversation(conversation));
})

socket.on('conversations', conversations => {
  store.dispatch(gotConversations(conversations));
});

socket.on('newConversation', conversation => {
  store.dispatch(addConversation(conversation));
});

socket.on('users', users => {
  store.dispatch(gotUsers(users));
});

socket.on('newUser', user => {
  store.dispatch(addUser(user));
})

export const login = (credentials) => {
    socket.emit('login', credentials);
};

export const register = (credentials) => {
  socket.emit('newUser', credentials);
}

export const getConvos = (userId) => {
  socket.emit('getConversations', userId);
}

export const getUsers = () => {
  socket.emit('getUsers');
}

export const openConvo = (id) => {
  socket.emit('openchat', id);
}

export const createConvo = (name, userIds) => {
  socket.emit('createchat', { name, userIds });
}

export const logout = () => {
    store.dispatch(clearUser());
    store.dispatch(clearUsers());
    store.dispatch(clearConversation());
    store.dispatch(clearConversations());
    store.dispatch(clearMessages());
}

export const chooseConversation = () => {
  store.dispatch(clearConversation());
  store.dispatch(clearConversations());
  store.dispatch(clearMessages());
}

export const sendMessage = (text, sender, convoId) => {
    socket.emit('message', { text, sender, convoId });
};

export default store;
export * from './conversations';
export * from './user';
export * from './messages';
export * from './users';
