var statType_id_count = 1;

function StatisticType(name, desc){
    this.statType_id = statType_id_count++;
    this.statType_name = name;
    this.statType_desc = desc;
}

StatisticType.prototype.eloValue = function getEloValue(statName) {
    switch(statName){
        case "Game Time":
            return 0.1667;
        case "Kills":
            return 1;
        case "Deaths":
            return -1.5;
        case "Destroyed Boxes":
            return 0.4
        case "Coins Gathered":
            return 0.5
    }
}

StatisticType.prototype.toString = function () {
    return this.statType_name;
}