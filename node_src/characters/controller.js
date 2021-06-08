let connect = require("../connection")
let {ObjectId} = require('mongodb');

exports.newCharacter = async (req, res) => {
    let newCharacter = req.body;
    newCharacter.userId = req.session._id;
    newCharacter.items = [];
    let {db_client, db_connection} = await connect();
    try {
        await db_connection.collection('characters').insertOne(newCharacter);
        res.send('Personnage crée');
    } catch (e) {
        res.status(400);
        res.send(e.message);
        console.log(e.message);
    }

}
exports.getCharacters = async (req, res) => {
    let {db_client, db_connection} = await connect();
    try {
        let characters = await db_connection.collection('characters').find({userId: req.session._id}).toArray((err, result) => {
            if (err) return console.log(err);
            db_client.close();
            res.send(result);
        });
        res.send(characters);
    } catch (e) {
        res.send(e);
    }
}