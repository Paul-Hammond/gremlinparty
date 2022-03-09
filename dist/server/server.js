import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';
import { Server } from 'socket.io';
const PORT = process.env.PORT || 29070;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.dirname(__dirname);
//(3/9/22) cry havoc and let slip the dogs of server init functions
const expressApp = express();
const server = http.createServer(expressApp);
const io = new Server(server);
expressApp.use(express.static(path.join(distPath, 'public')));
server.listen(PORT, () => console.log(`server listening on port ${PORT}`));
io.on('connection', (socket) => {
    console.log('client connection: ' + socket.id);
    socket.on('hello', (msg) => {
        console.log(`${socket.id} sent ${msg}`);
    });
    socket.on('disconnect', () => {
        console.log(`${socket.id} disconnected`);
    });
});
