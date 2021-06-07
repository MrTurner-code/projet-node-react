const express = require('express');
const app = express();
const session = require('express-session');
const cors = require('cors');
const {objectId} = require('mongodb')
const authRouter = require('./user/router')
let connect = require("./connection.js");
let config = require("./config.js");
app.use(express.json())
const corsOptions = {
    origin: ["http://localhost:3000"],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true,
};

app.use(cors(corsOptions));
const verifySession = (req, res, next) => {
    if (req.session.loggedIn === true) {
        console.log("Logged in, you can proceed")
        next()
    } else {
        res.status(403);
        console.log("You must be authenticated to proceed")
        res.send("You must be authenticated")
    }
}
app.use(session({secret: "keep it secret", name: "uniqueSessionId", saveUninitialized: false}))

app.use('/auth', authRouter)





app.get('/', (req, res) => {
    res.send('hello world ma gueule !')
})

app.listen(config.port, function () {
    console.log(`Example app listening on port ${config.port} !`)
});