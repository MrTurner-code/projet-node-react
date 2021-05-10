const express = require('express');
const app = express();

let connect = require("./connection.js")
let config = require("./config.js")

app.get('/app', (req, res) => {
    res.send('hello world ma gueule !')
})

app.listen(config.port, function () {
    console.log(`Example app listening on port ${config.port} !`)
});