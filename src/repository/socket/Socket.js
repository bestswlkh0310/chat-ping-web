import io from "socket.io-client";

const chatPingSocket = io.connect("http://localhost:3001");

export default chatPingSocket;