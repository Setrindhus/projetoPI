var games_id_count = 1;

function GameSession(sDate, desc, player){
    this.game_id = games_id_count++;
    this.game_sDate = sDate;
    this.game_desc = desc;
    this.game_player = player;
}