'use strict'

const express = require('express');
const app = express();
const PORT = 8080;
const HOST = '0.0.0.0';

app.get('/', (req, res) => {
    console.log(req.originalUrl);
    res.send('hello, world!');
});

app.use('/', express.static('pages'));
app.listen(PORT, HOST);

console.log("Up and running"); 