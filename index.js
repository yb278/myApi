const express = require('express');
const app = express();
const routes = require('./routes');
const path = require('path');

app.use(express.json()); // Adding middleware
app.use('/', routes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const port = process.env.PORT || 3030;
app.listen(port, () => console.log(`Listening on port ${port}`));