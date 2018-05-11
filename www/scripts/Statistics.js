var stat_id_count = 1;

function Statistic(value, type, game){
    this.stat_id = stat_id_count++;
    this.stat_value = value;
    this.stat_type = type;
    this.stat_game = game;
}

Statistic.prototype.eloScore =  function getEloScore(statType) {
    var baseELO = statType.eloValue(this.stat_type.statType_name);
    return baseELO * this.stat_value;
}