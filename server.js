const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const PASSCODE = 'admin123'; // Keep it simple and let the user know

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/data', (req, res) => {
    fs.readFile(path.join(__dirname, 'data.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to read data' });
        }
        res.json(JSON.parse(data));
    });
});

app.post('/api/data', (req, res) => {
    const { passcode, data } = req.body;
    
    // Passcode validation
    if (passcode !== PASSCODE) {
        return res.status(401).json({ error: 'Unauthorized: Invalid passcode' });
    }

    fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to save data' });
        }
        res.json({ success: true });
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
