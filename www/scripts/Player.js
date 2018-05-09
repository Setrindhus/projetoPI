/*var Player =(function() {
    var nextId = 1;
    return function Player (name, bday, country){
        this.player_id = nextId++;
        this.player_name = name;
        this.player_bday = bday;
        this.player_country = country;
    }
});*/

var player_id_count = 1;

function Player (name, bday, country){
    this.player_id = player_id_count++;
    this.player_name = name;
    this.player_bday = bday;
    this.player_country = country;
}
