let connect = require("../connection")
let {ObjectId} = require('mongodb');
const bcrypt = require('bcrypt');

exports.signup = async (req, res) => {
    let newUser = req.body;
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
            await db_connection.collection("users").insertOne(newUser);
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
        res.send("Server error");
    }
}
exports.login = async(req,res) => {
    try {
        const loginData = req.body;

        let { db_client, db_connection } = await connect();

        let user = await db_connection
            .collection("users")
            .findOne({ username: loginData.username });
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
}
exports.check = (req, res) => res.send("Authenticated");
exports.deleteUser = async (req, res) => {
    console.log(req.params.id);
    let {db_client, db_connection} = await connect();
    try {
        db_connection.collection('users').deleteOne({_id: ObjectId(req.params.id)})
            .then(() => res.send('suppression effectuée avec succès'))
            .catch(e => console.log(e))
    } catch (e) {
        console.log(e)
    }
}
exports.getUsers = async (req, res) => {
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
}

