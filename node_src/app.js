const express = require('express');
const app = express();
const session = require('express-session');
const cors = require('cors');
const {objectId} = require('mongodb')
const authRouter = require('./user/router');
const characterRouter = require('./characters/router');
let connect = require("./connection.js");
let config = require("./config.js")
const corsOptions = {
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json())

app.use(session({secret: "keep it secret", name: "uniqueSessionId", saveUninitialized: false}))

app.use('/auth', authRouter)
app.use('/character', characterRouter);


app.listen(config.port, function () {
    console.log(`Example app listening on port ${config.port} !`)
});