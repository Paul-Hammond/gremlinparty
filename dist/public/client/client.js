//(3/9/22) this cdn-import works just fine in javascript, the link is correct, but for some reason 
//the typescript compiler cannot find it. the ts-ignore forces ts to accept the import. 
//@ts-ignore
import { io } from "https://cdn.socket.io/4.3.0/socket.io.esm.min.js";
const socket = io();
socket.emit('hello', 'hnlo');
