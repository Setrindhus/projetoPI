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


//GameSessions

function getGameSessions(req, res) {
    execute(res, "SELECT * FROM gameSession", []);
}

function insertGameSession(req, res) {
    var id = Number.parseInt(req.body.game_player_id);
    execute(res, "INSERT INTO gameSession (game_SDate, game_Desc, game_Player_ID) VALUES(?,?,?)",
        [req.body.game_sdate, req.body.game_desc, id]);
}

function deleteGameSession(req, res) {
    var id = Number.parseInt(req.body.game_id);

    execute(res, "DELETE FROM gameSession where game_ID = ?", [id]);
}

function updateGameSession(req, res) {

    var id_player = Number.parseInt(req.body.game_player_id);
    var id_game = Number.parseInt(req.body.game_id);
    execute(res, "UPDATE gameSession SET game_SDate =?, game_Desc=?, game_Player_ID=? where game_ID=?",
        [req.body.game_sdate, req.body.game_desc, id_player, id_game]);
}

module.exports.getGameSessions = getGameSessions;
module.exports.insertGameSession = insertGameSession;
module.exports.deleteGameSession = deleteGameSession;
module.exports.updateGameSession = updateGameSession;


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

// StatisticType

function getStatisticTypes(req, res) {
    execute(res, "SELECT * FROM statisticType", []);
}

module.exports.getStatisticTypes = getStatisticTypes;

// Statistic

function getStatistics(req, res) {
    execute(res, "SELECT * FROM statistic", []);
}

module.exports.getStatistics = getStatistics;