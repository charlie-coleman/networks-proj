import io from 'socket.io-client';
const socket = io('https://charlie-coleman.com:3000', { secure: true });

socket.connect();
export default socket;
