//var games_id_count = 1;

/*function GameSession(sDate, desc, player){
    this.game_id = games_id_count++;
    this.game_sDate = sDate;
    this.game_desc = desc;
    this.game_player = player;
}*/

function GameSession(sDate, desc, player, game_id){
    this.game_id = game_id;
    this.game_sDate = sDate;
    this.game_desc = desc;
    this.game_player = player;
}

GameSession.prototype.toString = function() {
    return this.game_id;
}