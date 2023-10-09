'use strict'
// Load the required lobraries
const bodyParser = require('body-parser');
const express = require('express');
const readline = require('readline');
const fs = require('fs');
const app = express();

// Defining posts and host
const PORT = 8080;
const HOST = '0.0.0.0';

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/postmessage', (req, res) => {
    var timestamp = new Date(); 
    var data = req.body.topic + "\n" + req.body.data + "\nTimestamp: " + timestamp.getTime() + "\n"; 

    // Write information into the file
    fs.writeFile('pages/posts.txt', data, { flag: 'a+' }, err => {
        if (err) {
            res.status(500).send("Failed to write data into file");
        } else {
            res.status(200).send("Successful writing data to file");
        }
    });
});

app.get('./posts.txt', (req, res) => {
    fs.readFile('./posts.txt', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send("Failed to read $(posts.txt} file");
        } else {
            const posts = data.split('\n');
            res.json({ posts });
        }
    });
});

app.use('/', express.static('pages'));
app.listen(PORT, HOST);

console.log("Up and running"); 