import io from 'socket.io-client';
const socket = io('https://charlie-coleman.com:8080');//, { secure: true });

socket.connect();
export default socket;
