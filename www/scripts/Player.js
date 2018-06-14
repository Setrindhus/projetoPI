//var player_id_count = 1;

/*function Player (name, bday, country){
    this.player_id = player_id_count++;
    this.player_name = name;
    this.player_bday = bday;
    this.player_country = country;
}*/

function Player (name, bday, country, player_id){
    this.player_id = player_id;
    this.player_name = name;
    this.player_bday = bday;
    this.player_country = country;
}

Player.prototype.toString = function() {
    return this.player_name;
}