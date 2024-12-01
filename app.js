const express = require('express');

const path = require('path');
const bodyParser = require("express");

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('login', (req, res) => {
  res.send(req.body);
})

app.listen(3000);
console.log('Server started on port 3000');