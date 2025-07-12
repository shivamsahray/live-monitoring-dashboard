const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./db');
const http = require('http');
const { Socket } = require('socket.io');

app.use(cors());
app.use(express.json());

app.get('/api/devices', (req, res) => {
    db.query('SELECT * FROM devices', (err, results) => {
        if(err) return res.status(500).json({ error: err});
        res.json(results);
    });
});

const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
    cors: {
        origin: "*",
    }
})
io.on('connection', (socket) => {
    console.log('New WebSocket connection');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});
setInterval(() => {
    const randomId = Math.floor(Math.random() * 5) + 1;
    const statuses = ['OK' , 'UNKNOWN'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

    const packet = {
        id: randomId,
        line1_status: randomStatus,
        voltage1: `${Math.floor(Math.random() * 100)}V`,
        updated_at: new Date()
    };

    io.emit('device-update', packet);
}, 1000);

const PORT = 5000;
server.listen(PORT, () => console.log("Seriver is running on PORT " + PORT));