const express = require('express');
const app = express();
const session = require('express-session');
const cors = require('cors');
const {ObjectId} = require('mongodb')
const characterRouter = require('./characters/router');
let connect = require("./connection.js");
let config = require("./config.js")
const bcrypt = require('bcrypt');

const corsOptions = {
    origin: ["http://localhost:3000"],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true,
};
const verifySession = (req, res, next) => {
    if (req.session && req.session.loggedIn === true) {
        console.log("Logged in, you can proceed");
        next();
    } else {
        res.status(403);
        console.log("You must be authenticated to proceed");
        res.send("You must be authenticated");
    }
};

app.use(session({secret: "keep it secret", name: "uniqueSessionId", saveUninitialized: false}))
app.use(cors(corsOptions));
app.use(express.json())
app.get("/", verifySession, function (req, res) {
    res.send(req.session.savedDocuments);
});
app.post("/auth/signup", async (req, res) => {
    let newUser = req.body;
    console.log(newUser);

    try {
        let {db_client, db_connection} = await connect();

        try {
            let user = await db_connection
                .collection("users")
                .findOne({username: newUser.username});

            if (user) {
                throw new Error("User already exists");
            }

            newUser.password = await bcrypt.hash(newUser.password, 10);

            await db_connection.collection("users").insertOne(newUser)

            res.send("User successfuly signed up");
            console.log("singup ok");
        } catch (err) {
            res.status(400);
            res.send(err.message);
            console.log(err.message);
        }
    } catch (err) {
        res.status(500);
        console.log("Server error");
        res.send("Server error")
    }
});

app.post("/auth/login", async (req, res) => {
    try {
        const loginData = req.body;

        let {db_client, db_connection} = await connect();

        let user = await db_connection
            .collection("users")
            .findOne({username: loginData.username});
        try {
            if (!user) {
                throw new Error("Invalid username");
            }

            const samePassword = await bcrypt.compare(
                loginData.password,
                user.password
            );

            if (!samePassword) {
                throw new Error("Invalid password");
            }

            req.session.username = user.username;
            req.session.loggedIn = true;

            res.send("Logged in");
        } catch (err) {
            res.status(403);
            console.log(err.message);
            res.send("Invalid credentials");
        }
    } catch (err) {
        res.status(500);
        res.send("Server error");
    }
});

// app.get("/auth/check", verifySession, (req, res) => res.send("Authenticated"));
app.get('/auth', async (req, res) => {
    let {db_client, db_connection} = await connect();
    try {
        db_connection.collection('users').find({}).toArray((err, result) => {
            if (err) return console.log(err)
            console.log('users :', result)
            db_client.close()
            res.send(result)
        })
    } catch (e) {
        console.log(e)
    }
})
app.post("/auth/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
            res.status(500);
            res.send("An error occured while logging out");
        } else {
            console.log("Logged out");
            res.send("Logged out");
        }
    });
});
app.post('/character', verifySession, async (req, res) => {
    const username = req.session.username
    console.log(req.session.username);
    req.body.created_by = username
    req.body.items = [];
    let {db_client, db_connection} = await connect();
    try {
        await db_connection.collection('characters').insertOne(req.body).then(result => {
            console.log("result : ", result);
            res.send(result.insertedId)
        })
    } catch
        (e) {
        res.status(400);
        res.send(e.message);
        console.log(e.message)
    }

})
app.get('/characters', async (req, res) => {
    try {
        const username = req.session.username;

        let {db_client, db_connection} = await connect();
        db_connection
            .collection("characters")
            .find({created_by: username})
            .toArray((err, result) => {
                if (err) return console.log(err);

                console.log("characters :", result);

                db_client.close();
                res.send(result);
            });
    } catch (err) {
        res.status(500);
        res.send("Server error");
    }
});
app.get('/character/:id', async (req, res) => {
    try {
        console.log(req.params.id)
        let {db_client, db_connection} = await connect();
        let character = await db_connection.collection('characters').findOne({_id: ObjectId(req.params.id)})
        res.send(character);

    } catch (e) {
        res.send(e);
    }
})
app.post('/character/:id/add-item', async (req, res) => {
    let {db_client, db_connection} = await connect();

    try {
        let character = await db_connection.collection('characters').findOne({_id: ObjectId(req.params.id)})

        let newArray = [...character.items, req.body];
        console.log(newArray)
        character.items = newArray
        console.log(character)
        await db_connection.collection('characters').replaceOne({_id: ObjectId(req.params.id)}, character);
        res.send('objet ajoutée dans la collection');
    } catch (e) {
console.log('ça marche pas')
        res.send(e);
    }
})

app.listen(config.port, function () {
    console.log(`Example app listening on port ${config.port} !`)
});