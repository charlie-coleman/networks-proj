import io from 'socket.io-client';
const socket = io('http://localhost:8080');//, { secure: true });

socket.connect();
export default socket;
