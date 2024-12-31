const express = require('express');
const app = express();
const routes = require('./routes');
const path = require('path');
const xlsx = require('xlsx');
require('dotenv').config(); // Load environment variables from .env file

app.use(express.json()); // Adding middleware
app.use('/', routes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/status', (req, res) => {
    try {
        const workbook = xlsx.readFile(path.join(__dirname, 'merchants.xls'));
        res.json({ connected: true });
    } catch (error) {
        res.json({ connected: false });
    }
});

const port = process.env.PORT || 3030;
app.listen(port, () => console.log(`Listening on port ${port}`));