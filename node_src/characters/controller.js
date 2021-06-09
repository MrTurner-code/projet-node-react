let connect = require("../connection")
let {ObjectId} = require('mongodb');

exports.newCharacter = async (req, res) => {
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

}
exports.getCharacters = async (req, res) => {
    let {db_client, db_connection} = await connect();
    try {
        let characters = await db_connection.collection('characters').find({created_by: req.session.username}).toArray((err, result) => {
            if (err) return console.log(err);
            db_client.close()
            res.send(result);
        });
        res.send(characters);
    } catch (e) {
        res.send(e);
    }
}