"use strict"

const mysql = require("mysql");
const connectionOptions = require("./connection-options");

function execute(res, sqlCommand, values, callback) {
    var sql = mysql.format(sqlCommand, values);
    var connection = mysql.createConnection(connectionOptions);
    connection.connect();
    connection.query(sql, function(err, results, fields) {
        res.json(results);
    });
    connection.end();
}


//Players

function getPlayers(req, res) {
    execute(res, "SELECT * FROM player", []);
}

function insertPlayer(req, res) {
    execute(res, "INSERT INTO player (player_Name, player_Bday, player_Country) VALUES(?,?,?)",
        [req.body.player_name, req.body.player_bday, req.body.player_country]);
}

function deletePlayer(req, res) {
    var id = Number.parseInt(req.body.player_id);

    execute(res, "DELETE FROM player where player_ID = ?", [id]);
}

function updatePlayer(req, res) {

    var id = Number.parseInt(req.body.player_id);
    execute(res, "UPDATE player SET player_Name =?, player_Bday=?, player_Country=? where player_ID=?",
        [req.body.player_name, req.body.player_bday, req.body.player_country, id]);
}



module.exports.getPlayers = getPlayers;
module.exports.insertPlayer = insertPlayer;
module.exports.deletePlayer = deletePlayer;
module.exports.updatePlayer = updatePlayer;