

var p1 = new Player("João", new Date("2008-08-08"), "PT");
var p2 = new Player("Joana", new Date("2009-09-09"), "PT");
var p3 = new Player("Miguel", new Date("2010-10-10"), "PT");
var p4 = new Player("Manuela", new Date("2011-11-11"), "PT");
var p5 = new Player("Manuel", new Date("2012-12-12"), "PT");

var arrayPlayers = [
    p1, p2, p3, p4, p5
];
var arrayGames = [
    new GameSession(new Date("2018-05-07"), "Level 1 - Origins", p1),
    new GameSession(new Date("2018-04-06"), "Level 2 - Going On", p1),
    new GameSession(new Date("2018-03-05"), "Level 1 - Origins", p2)
];

var s1 = new StatisticType("Game Time", "Tempo total de jogo, em minutos");
var s2 = new StatisticType("Deaths", "Número de vezes que morreu");
var s3 = new StatisticType("Coins Gathered", "Número de moedas recolhidas");
var s4 = new StatisticType("Destroyed Boxes", "Número de caixas destruídas");
var s5 = new StatisticType("Kills", "Número de inimigos que matou");

var arrayStatsTypes = [
    s1, s2, s3, s4, s5
];
var arrayStats = [
    new Statistic(240, s1, 1),
    new Statistic(5, s2, 1),
    new Statistic(22, s3, 1),
    new Statistic(10, s4, 1),
    new Statistic(55, s5, 1),
    new Statistic(446, s1, 2),
    new Statistic(7, s2, 2),
    new Statistic(49, s3, 2),
    new Statistic(16, s4, 2),
    new Statistic(123, s5, 2),
    new Statistic(180, s1, 3),
    new Statistic(5, s2, 3),
    new Statistic(27, s3, 3),
    new Statistic(12, s4, 3),
    new Statistic(48, s5, 3)
];

var active_tab = "home";

/* Visuais */

/**
 * Escurece o fundo do separador ativo
 */
function highlightSelectedTab() {
    eraseTabsHighlights();
    switch (active_tab) {
        case "home":
            document.getElementsByTagName("nav")[0].firstElementChild.style.backgroundColor = "dimgray";
            break;
        case "players":
            document.getElementsByTagName("nav")[0].children[1].style.backgroundColor = "dimgray";
            break;
        case "gameSessions":
            document.getElementsByTagName("nav")[0].children[2].style.backgroundColor = "dimgray";
            break;
        case "stats":
            document.getElementsByTagName("nav")[0].children[3].style.backgroundColor = "dimgray";
            break;
    }
}

function eraseTabsHighlights() {
    for (let i = 0; i < document.getElementsByTagName("nav")[0].children.length; i++) {
        let li = document.getElementsByTagName("nav")[0].children[i];
        li.style.backgroundColor = 'rgb(150, 150, 150)';
    }
}

function highlightSelectedTableRow(tr) {
    tr.style.backgroundColor = "darkblue";
}

function eraseTablesHighlights() {
    var tables = document.getElementsByTagName("table");
    for (let i = 0; i < tables.length; i++) {
        let table = tables[i];
        for (let j = 1; j < table.childNodes.length; j++) {
            let tr = table.childNodes[j];
            tr.style.backgroundColor = "white";
        }
    }
}

/* Utils */

/**
 * Esconde todos os separadores
 */
function closeTabs() {
    document.getElementById("home").style.display = "none";
    document.getElementById("players").style.display = "none";
    document.getElementById("gameSessions").style.display = "none";
    document.getElementById("stats").style.display = "none";

    resetSelecteds();
}

/**
 * Restaura os valores dos IDs seleccionados
 */
function resetSelecteds() {
    selectedGameSessionID = void 0;
    selectedPlayerID = void 0;
}

/**
 * Retorna uma tabela com a posição no ranking e nome do jogador, ordenada por ordem decrescente do score dos jogadores
 */
function calculateLeaderboardRanks() {
    let leaderboard = [];

    for (let i = 0; i < arrayPlayers.length; i++) {
        let player = arrayPlayers[i];
        let elo = 0;
        for (let j = 0; j < arrayGames.length; j++) {
            let gameSession = arrayGames[j];
            if (player == gameSession.game_player) {
                for (var y = 0; y < arrayStats.length; y++) {
                    let stat = arrayStats[y];
                    if (stat.stat_game == gameSession) {
                        elo += stat.eloScore(stat.stat_type);
                    }
                }
            }
        }
        let rank = {
            playerName: player,
            score: Math.round(elo)
        }
        leaderboard.push(rank);
    }

    leaderboard.sort(function (a, b) {
        return a.score - b.score;
    }).reverse();

    var ranks = [];
    for (let i = 0; i < leaderboard.length; i++) {
        let rank = {
            pos: i + 1,
            playerName: leaderboard[i].playerName
        }
        ranks.push(rank);
    }

    return ranks;
}

/**
 * Retorna uma tabela com tipo de estatística e os seus valores totais do jogador
 * @param {Integer} id 
 */
function playerTotalStats(id) {
    let arrayOfStats = [];
    let arrayOfTotalStats = [];
    for (let i = 0; i < arrayGames.length; i++) {
        let gameSession = arrayGames[i];
        if (id == gameSession.game_player.player_id) {
            for (let j = 0; j < arrayStats.length; j++) {
                let stat = arrayStats[j];
                if (arrayStats[j].stat_game == gameSession) {
                    let statToArray = {
                        statType: stat.stat_type,
                        statValue: stat.stat_value
                    }
                    arrayOfStats.push(statToArray);
                }
            }
        }
    }

    for (let i = 0; i < arrayOfStats.length; i++) {
        let statTotal = {
            statType: arrayOfStats[i].statType,
            statTotalValue: arrayOfStats[i].statValue
        }

        let inArray = false;

        for (let j = 0; j < arrayOfTotalStats.length; j++) {
            if (statTotal.statType == arrayOfTotalStats[j].statType) {
                inArray = true;
            }
        }

        if (!inArray) {
            for (let j = 0; j < arrayOfStats.length; j++) {
                if (arrayOfStats[i].statType == arrayOfStats[j].statType) {
                    statTotal.statTotalValue += arrayOfStats[j].statValue;
                }
            }
            arrayOfTotalStats.push(statTotal);
        }
    }

    return arrayOfTotalStats;
}

/**
 * Calcula a diferença, em anos, de uma data até à data presente
 * @param {Date} birthday 
 */
function calculateAge(birthday) { // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

/**
 * Se existe um elemento com o id passado como argumento, apaga-o.
 * @param {String} id 
 */
function deleteElement(id) {
    var elem = document.getElementById(id);
    if (elem !== null) {
        elem.parentNode.removeChild(elem);
    }
}

/* Abrir e Fechar Separadores */
function openHome() {
    closeTabs();
    document.getElementById("home").style.display = "block";

    active_tab = "home"
    highlightSelectedTab();
}

function openPlayers() {
    closeTabs();
    document.getElementById("players").style.display = "block";
    document.getElementById("playersButtons").style.display = "block";
    document.getElementById("addPlayers").style.display = "none";
    createTable(arrayPlayers);

    active_tab = "players"
    highlightSelectedTab();
}

function openGameSessions() {
    closeTabs();
    document.getElementById("gameSessions").style.display = "block";
    document.getElementById("sessionsButtons").style.display = "block";
    document.getElementById("addGameSessions").style.display = "none";
    createTable(arrayGames);

    active_tab = "gameSessions"
    highlightSelectedTab();
}

function openStats() {
    closeTabs();
    let parent = document.getElementById("stats");
    parent.style.display = "block";
    parent.firstElementChild.style.display = "block";
    document.getElementById("chartContainer").style.display = "none";
    createTable(calculateLeaderboardRanks());

    active_tab = "stats"
    highlightSelectedTab();
}

function openCreatePlayer() {
    openPlayers();
    document.getElementById("playersTable").style.display = "none";
    document.getElementById("playersButtons").style.display = "none";
    document.getElementById("addPlayers").style.display = "block";
}

function openCreateSession() {
    openGameSessions();
    document.getElementById("gamesTable").style.display = "none";
    document.getElementById("sessionsButtons").style.display = "none";
    document.getElementById("addGameSessions").style.display = "block";
}

function openPlayerStats(){
    openStats();
    let parent = document.getElementById("stats");
    console.log(parent.firstElementChild);
    parent.firstElementChild.style.display = "none";
    document.getElementById("chartContainer").style.display = "block";
}

function openEdit() {

}

function cancel(open) {


    //Player Form
    document.getElementById("player_name").value = "";
    document.getElementById("player_bday").value = "";
    document.getElementById("player_country").value = "Germany";

    //Game Sessions Form
    document.getElementById("game_sDate").value = "";
    document.getElementById("game_desc").value = "";
    document.getElementById("game_player").value = "";

    open();
}

/* Controladores */

var selectedPlayerID = void 0;
var selectedGameSessionID = void 0;

// ************************PLAYERS************************

/**
 * Atualiza a variável selectedPlayerID para a do jogador seleccionado e realça o jogador seleccionado na tabela
 * @param {Integer} id 
 * @param {HTMLTableRowElement} tr 
 */
function selectPlayer(id, tr) {
    selectedPlayerID = id;
    eraseTablesHighlights();
    highlightSelectedTableRow(tr);
}

/**
 * Creates a player and puts in the array
 */
function addPlayer() {
    var player_name = document.getElementById("player_name").value;
    var player_bday = document.getElementById("player_bday").value;
    var player_country = document.getElementById("player_country").value;


    if (player_name == ""
        || player_bday.split("/")[0] == "dd"
        || player_bday.split("/")[1] == "mm"
        || player_bday.split("/")[2] == "yyyy"
        || player_country == "") {
        alert("Insert valid values!");
        return;
    } else {
        arrayPlayers.push(new Player(player_name, new Date(player_bday), player_country));
        openPlayers();
        return;
    }
}

// ************************GAME SESSIONS************************

/**
 * Atualiza a variável selectedGameSessionID para a do jogo seleccionado e realça o jogo seleccionado na tabela
 * @param {Integer} id 
 * @param {HTMLTableRowElement} tr 
 */
function selectGameSession(id, tr) {
    selectedGameSessionID = id;
    eraseTablesHighlights();
    highlightSelectedTableRow(tr);
}

function addSession() {
    var game_sDate = document.getElementById("game_sDate").value;
    var game_desc = document.getElementById("game_desc").value;
    var game_player = document.getElementById("game_player").value;

    if (game_sDate.split("/")[0] == "dd"
        || game_sDate.split("/")[1] == "mm"
        || game_sDate.split("/")[2] == "yyyy"
        || game_desc == ""
        || game_player == "") {
        alert("Insert valid values!");
        return;
    } else {
        arrayGames.push(new GameSession(new Date(game_sDate), game_desc, game_player));
        openGameSessions();
        return;
    }
}

// ************************STATISTICS************************

function selectPlayerStats(id) {
    let player = void 0;
    for(let i = 0; i<arrayPlayers.length ; i++){
        if(arrayPlayers[i].player_id == id){
            player = arrayPlayers[i];
        }
    }
    openPlayerStats();

    playerColumnGraph(playerTotalStats(id),player);
}

function playerColumnGraph(array, player) {
    let dataArray = [];
    for(let i = 0; i<array.length; i++){
        let data = {
            y: array[i].statTotalValue,
            label: array[i].statType
        }
        dataArray.push(data);
    }

    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "light2", // "light1", "light2", "dark1", "dark2"
        title:{
            text: player.player_name + " Stats"
        },
        axisY: {
            title: "Value"
        },
        data: [{        
            type: "column",  
            /* showInLegend: true, 
            legendMarkerColor: "grey",
            legendText: "MMbbl = one million barrels", */
            dataPoints: dataArray
        }]
    });
    chart.render();
}


/* Criação de Tabelas */

/**
 * Cria uma tabela para o array recebido.
 * @param {Array} array 
 */
function createTable(array) {
    //Verifica qual a tabela
    if (array[0] instanceof Player) {
        deleteElement("playersTable"); //Apaga a tabela para reconstruir
        var table = document.createElement("table");
        table.id = "playersTable"; //Adiciona ID a tabela
        var parent = document.getElementById("players").firstElementChild; //Vai buscar o elemento pai
    } else if (array[0] instanceof GameSession) {
        deleteElement("gamesTable");
        var table = document.createElement("table");
        table.id = "gamesTable";
        var parent = document.getElementById("gameSessions").firstElementChild;
    } else {
        deleteElement("leaderboard");
        var table = document.createElement("table");
        table.id = "leaderboard";
        var parent = document.getElementById("stats").firstElementChild;
    }

    table.appendChild(tableHeader(array)); //Adiciona o cabecalho

    //Cria a tabela
    for (let index in array) {
        var player = array[index];
        let tr = document.createElement("tr");
        for (let property in player) {

            var td = document.createElement("td");
            if (!(player[property] instanceof Function)) {

                if (property.includes("_bday")) { //Se for a data de nascimento
                    td.textContent = calculateAge(player[property]); //adiciona a idade a celula
                } else if (property.includes("_sDate")) {
                    td.textContent = player[property].toISOString().split("T")[0];
                } else {
                    td.textContent = player[property]; //adiciona o valor a uma celula
                }

                tr.appendChild(td); //adiciona a celula a fila
            }

            if (array[0] instanceof Player) {
                tr.onclick = function () { selectPlayer(tr.firstElementChild.textContent, tr) };
            } else if (array[0] instanceof GameSession) {
                tr.onclick = function () { selectGameSession(tr.firstElementChild.textContent, tr) };
            } else {
                tr.onclick = function () { selectPlayerStats(tr.firstElementChild.textContent) };
            }

            table.appendChild(tr); //adiciona a fila a tabela
        }
    }

    parent.appendChild(table); //adiciona a tabela ao elemento pai
}

/**
 * Cria o cabecalho da tabela relativo ao array passado como argumento.
 * @param {Array} array 
 */
function tableHeader(array) {
    var thr = document.createElement("tr");

    var element = array[0];
    //Texto de cada celula do cabecalho, muda dependendo da propriedade
    for (let property in element) {

        var th = document.createElement("th");

        if (!(element[property] instanceof Function)) {

            if (property.includes("_id")) {
                th.textContent = "ID";
                thr.appendChild(th);
            }
            else if (property.includes("_name")) {
                th.textContent = "Name";
                thr.appendChild(th);
            }
            else if (property.includes("_bday")) {
                th.textContent = "Age";
                thr.appendChild(th);
            }
            else if (property.includes("_country")) {
                th.textContent = "Country";
                thr.appendChild(th);
            }
            else if (property.includes("_desc")) {
                th.textContent = "Description";
                thr.appendChild(th);
            }
            else if (property.includes("_sDate")) {
                th.textContent = "Start Date";
                thr.appendChild(th);
            }
            else if (property.includes("_player")) {
                th.textContent = "Player";
                thr.appendChild(th);
            }
            else if (property.includes("_value")) {
                th.textContent = "Value";
                thr.appendChild(th);
            }
            else if (property.includes("_type")) {
                th.textContent = "Statistic Type";
                thr.appendChild(th);
            }
            else if (property.includes("_game")) {
                th.textContent = "Game Session";
                thr.appendChild(th);
            } else if (property.includes("playerName")) {
                th.textContent = "Player";
                thr.appendChild(th);
            } else if (property.includes("pos")) {
                th.textContent = "Rank";
                thr.appendChild(th);
            } else {
                th.textContent = property;
                thr.appendChild(th);
            }
        }
    }
    return thr;
}