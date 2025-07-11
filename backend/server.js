const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./db');

app.use(cors());
app.use(express.json());

app.get('/api/devices', (req, res) => {
    db.query('SELECT * FROM devices', (err, results) => {
        if(err) return res.status(500).json({ error: err});
        res.json(results);
    });
});

const PORT = 5000;
app.listen(PORT, () => console.log("Seriver is running on PORT " + PORT));