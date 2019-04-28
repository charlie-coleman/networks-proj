import { createStore, combineReducers } from 'redux';
import users, { gotUsers, gotNewUser, clearUsers } from './users';
import messages, { gotMessages, gotNewMessage } from './messages';
import user, { gotUser, clearUser } from './user';
import receiver, { gotReceiver, clearReceiver } from './receiver';
import socket from './socket';

const reducers = combineReducers({ users, messages, user, receiver });

const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

socket.on('priorMessages', messages => {
    store.dispatch(gotMessages(messages));
});

socket.on('userCreated', response => {
    const { user, users } = response;
    store.dispatch(gotUser(user));
    store.dispatch(gotUsers(users));
});

socket.on('newUser', user => {
    store.dispatch(gotNewUser(user));
});

socket.on('incomingMessage', message => {
    store.dispatch(gotNewMessage(message));
});

export const login = (credentials) => {
    socket.emit('newUser', credentials);
};

export const logout = () => {
    store.dispatch(clearUser());
    store.dispatch(clearReceiver());
    store.dispatch(clearUsers());
}

export const chooseChat = () => {
    store.dispatch(clearReceiver());
}

export const openChat = users => {
    socket.emit('chat', users);
};

export const setReceiver = receiver => {
    store.dispatch(gotReceiver(receiver));
}

export const sendMessage = (text, sender, receiver) => {
    socket.emit('message', { text, sender, receiver });
};

export default store;
export * from './receiver';
export * from './users';
export * from './user';
export * from './receiver';
export * from './messages';