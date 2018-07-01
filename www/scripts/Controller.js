

var arrayPlayers = [];
var arrayGames = [];
var arrayStatsTypes = [];
var arrayStats = [];

/**
 * Chama as funções para buscar os dados a base de dados
 */
function getData() {
    getPlayersBD();
    getGameSessionsBD();
    getStatisticTypeBD();
    getStatisticBD();
}

/*var p1 = new Player("João", new Date("2008-08-08"), "PT");
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
];*/

var active_tab = "home";

/* Visuais */

/**
 * Muda a cor da letra do separador ativo
 */
function highlightSelectedTab() {
    eraseTabsHighlights();
    switch (active_tab) {
        case "home":
            document.getElementById("menu").firstElementChild.style.color = "pink";
            break;
        case "players":
            document.getElementById("menu").children[1].style.color = "pink";
            break;
        case "gameSessions":
            document.getElementById("menu").children[2].style.color = "pink";
            break;
        case "stats":
            document.getElementById("menu").children[3].style.color = "pink";
            break;
    }
}

/**
 * Faz o reset das cores da barra de navegação
 */
function eraseTabsHighlights() {
    for (let i = 0; i < document.getElementById("menu").children.length; i++) {
        let li = document.getElementById("menu").children[i];
        li.style.color = "white";
    }
}

/**
 * Muda a cor de background da linha da tabela
 * @param {HTMLTableRowElement} tr 
 */
function highlightSelectedTableRow(tr) {
    if (active_tab === "gameSessions") {
        tr.style.backgroundColor = 'rgb(36, 36, 144)';
    } else {
        tr.style.backgroundColor = 'rgb(134, 26, 26)';
    }
    tr.style.color = "white";
}

/**
 * Faz o reset das cores das linhas das tabelas
 */
function eraseTablesHighlights() {
    var tables = document.getElementsByTagName("table");
    for (let i = 0; i < tables.length; i++) {
        let table = tables[i];

        for (let j = 1; j < table.childNodes.length; j++) {
            let tr = table.childNodes[j];
            tr.style.color = "black";
            if (j % 2 === 0) {
                tr.style.backgroundColor = "rgba(255,255,255,0)";
            } else {
                tr.style.backgroundColor = 'rgba(150, 150, 150,0.5)';
            }
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

    var bDate = new Date(birthday);
    var ageDifMs = Date.now() - bDate.getTime();
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

/**
 * Abre os separadoroes relacionados com os Players e fecha os restantes
 */
function openPlayers() {
    closeTabs();
    document.getElementById("players").style.display = "block";
    document.getElementById("playersButtons").style.display = "block";
    document.getElementById("addPlayers").style.display = "none";
    createTable(arrayPlayers);

    active_tab = "players"
    highlightSelectedTab();

    //limpa campos do player
    document.getElementById("player_name").value = "";
    document.getElementById("player_bday").value = "";
    document.getElementById("player_country").value = "Germany";

    resetSelecteds();
}

/**
 * Abre os separadoroes relacionados com as Game Sessions e fecha os restantes
 */
function openGameSessions() {
    closeTabs();
    document.getElementById("gameSessions").style.display = "block";
    document.getElementById("sessionsButtons").style.display = "block";
    document.getElementById("addGameSessions").style.display = "none";
    createTable(arrayGames);

    active_tab = "gameSessions"
    highlightSelectedTab();

    //Limpa forms do gameSessions
    document.getElementById("game_sDate").value = "";
    document.getElementById("game_desc").value = "";
}

/**
 * Abre os separadoroes relacionados com as Estatisticas e fecha os restantes
 */
function openStats() {
    closeTabs();
    document.getElementById("stats").firstElementChild.firstElementChild.textContent = "STATS";
    document.getElementById("stats").style.display = "block";
    document.getElementById("chartContainer").style.display = "none";
    createTable(calculateLeaderboardRanks());

    active_tab = "stats"
    highlightSelectedTab();
}

/**
 * Abre os separadoroes relacionados com a criacao de Players e fecha os restantes
 */
function openCreatePlayer() {
    //openPlayers();
    if (arrayPlayers.length != 0) {
        document.getElementById("playersTable").style.display = "none";
    }
    document.getElementById("playersButtons").style.display = "none";
    document.getElementById("addPlayers").style.display = "block";
    document.getElementById("addB").style.display = "inline";
    document.getElementById("editB").style.display = "none";
    if (selectedPlayerID == void 0) {
        document.getElementById("player_name").value = "";
        document.getElementById("player_bday").value = "";
        //document.getElementById("player_country").value = arrayPl;
        selectElement("player_country", "AR");
    }
    resetSelecteds();
}

function selectElement(id, valueToSelect) {
    var element = document.getElementById(id);
    element.value = valueToSelect;
}

/**
 * Abre os separadoroes relacionados com a criação de Game Sessions e fecha os restantes
 */
function openCreateSession() {
    clearPlayerListOptions();
    playerList();
    //openGameSessions();
    if (arrayGames.length != 0) {
        document.getElementById("gamesTable").style.display = "none";
    }
    document.getElementById("sessionsButtons").style.display = "none";
    document.getElementById("addGameSessions").style.display = "block";
    document.getElementById("addBS").style.display = "inline";
    document.getElementById("editBS").style.display = "none";

    if (selectedGameSessionID == void 0) {
        document.getElementById("game_desc").value = "";
        document.getElementById("game_sDate").value = "";
        document.getElementById("playerList").value = "";
        /*for(let i = 0;i<arrayPlayers.length;i++){
            if(arrayPlayers[i] != null){
        document.getElementById("playerList").value = arrayPlayers[i].player_id;
        break;
    }
    }*/
    }
    resetSelecteds();
}

/**
 * Abre os separadoroes relacionados com as estatisticas dos Players e fecha os restantes
 */
function openPlayerStats() {
    openStats();
    document.getElementById("leaderboard").style.display = "none";
    document.getElementById("chartContainer").style.display = "block";
}

/**
 * Abre os separadoroes relacionados com a edição de Players e fecha os restantes
 */
function openEditPlayer() {
    if (selectedPlayerID != void 0) {
        for (let i = 0; i < arrayPlayers.length; i++) {
            if (selectedPlayerID == arrayPlayers[i].player_id) {
                document.getElementById("player_name").value = arrayPlayers[i].player_name;
                document.getElementById("player_bday").value = formatDate(arrayPlayers[i].player_bday);
                document.getElementById("player_country").value = arrayPlayers[i].player_country;
                break;
            }
        }
        auxPlayerID = selectedPlayerID;

        if (arrayPlayers.length != 0) {
            document.getElementById("playersTable").style.display = "none";
        }
        document.getElementById("playersButtons").style.display = "none";
        document.getElementById("addPlayers").style.display = "block";
        document.getElementById("editB").style.display = "inline";
        document.getElementById("addB").style.display = "none";
        resetSelecteds();
    } else {
        alert("Please select a Player!")
    }
}

/**
 * Abre os separadoroes relacionados com a edição de Game Sessions e fecha os restantes
 */
function openEditSession() {
    if (selectedGameSessionID != void 0) {
        playerList(); //Cria as opções no form
        for (let i = 0; i < arrayGames.length; i++) {
            if (selectedGameSessionID == arrayGames[i].game_id) {
                document.getElementById("game_desc").value = arrayGames[i].game_desc;
                document.getElementById("game_sDate").value = formatDate(arrayGames[i].game_sDate);
                document.getElementById("playerList").value = arrayGames[i].game_player.player_id;
                break;
            }
        }
        auxSessionID = selectedGameSessionID;
        //Abre os Forms
        document.getElementById("gamesTable").style.display = "none";
        document.getElementById("sessionsButtons").style.display = "none";
        document.getElementById("addGameSessions").style.display = "block";

        document.getElementById("addBS").style.display = "none";
        document.getElementById("editBS").style.display = "inline";
    } else {
        alert("Please select a Player!")
    }
}

/**
 * Formata a string para uma Date, caso o dia ou mes seja meno que 10 adiciona um 0 antes do caracter
 * @param {*} date string no formato yyyy-mm-dd 
 * @return {string} string da data no formato yyyy-mm-dd
 */
function formatDate(date) {
    /*var b = date.toString();
    var year = b.slice(0,4);
    var month = b.slice(5,2);
    var day = b.slice(8,2);*/
    var bDate = new Date(date);

    var dd = bDate.getDate();
    var mm = bDate.getMonth() + 1;
    var yyyy = bDate.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    return today = yyyy + '-' + mm + '-' + dd;
}

/**
 * Volta a "página" anterior
 * @param {*} open nome da função
 */
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
var auxPlayerID = void 0;
var selectedGameSessionID = void 0;
var auxSessionID = void 0;

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
 * Cria ou edita um player dependendo do command
 * @param {*} command "Add" para adicionar "Edit" para editar
 */
function addPlayer(command) {
    var player_name = document.getElementById("player_name").value;
    var player_bday = document.getElementById("player_bday").value;
    var player_country = document.getElementById("player_country").value;

    switch (command) {
        case "Edit":
            if (auxPlayerID != void 0) {
                for (let i = 0; i < arrayPlayers.length; i++) {
                    if (auxPlayerID == arrayPlayers[i].player_id) {
                        if (player_name == ""
                            || player_bday.split("/")[0] == "dd"
                            || player_bday.split("/")[1] == "mm"
                            || player_bday.split("/")[2] == "yyyy"
                            || player_country == "") {
                            alert("Insert valid values!");
                            return;
                        } else {
                            arrayPlayers[i].player_name = player_name;
                            arrayPlayers[i].player_bday = new Date(player_bday);
                            arrayPlayers[i].player_country = player_country;
                            updatePlayerBD(player_name, player_bday, player_country, auxPlayerID);
                            openPlayers();
                            return;
                        }
                    }
                }
            }
        case "Add":
            if (player_name == ""
                || player_bday.split("/")[0] == "dd"
                || player_bday.split("/")[1] == "mm"
                || player_bday.split("/")[2] == "yyyy") {
                alert("Insert valid values!");
                return;
            } else {
                arrayPlayers.push(new Player(player_name, new Date(player_bday), player_country));
                insertPlayerBD(player_name, player_bday, player_country);
                openPlayers();
                return;
            }

    }
}

/**
 * Remove o player e todas as game sessions que lhe estão associadas
 */
function removePlayer() {
    if (selectedPlayerID != void 0) {
        arrayPlayers.forEach(function (player, index) {
            if (selectedPlayerID == player.player_id) {
                arrayPlayers.splice(index, 1);
                deletePlayerBD(selectedPlayerID);
            }
        });

        for (let i = 0; i < arrayGames.length; i++) {
            if (selectedPlayerID == arrayGames[i].game_player.player_id) {
                arrayGames.splice(i, 1);
                i -= 1;
            }
        }
        clearPlayerListOptions();
        openPlayers();
    } else {
        alert("Choose the player you want to remove!");
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

/**
 * Cria ou edita uma game session dependendo do command
 * @param {*} command "Add" para adicionar "Edit" para editar
 */
function addSession(command) {
    var game_sDate = document.getElementById("game_sDate").value;
    var game_desc = document.getElementById("game_desc").value;
    var game_player = document.getElementById("playerList").value;

    switch (command) {
        case "Edit":
            if (auxSessionID != void 0) {
                for (let i = 0; i < arrayGames.length; i++) {
                    if (auxSessionID == arrayGames[i].game_id) {
                        if (game_sDate.split("/")[0] == "dd"
                            || game_sDate.split("/")[1] == "mm"
                            || game_sDate.split("/")[2] == "yyyy"
                            || game_desc == "") {
                            alert("Insert valid values!");
                            return;
                        } else {
                            arrayGames[i].game_desc = game_desc;
                            arrayGames[i].game_sDate = new Date(game_sDate);
                            let player = null;
                            for (let i = 0; i < arrayPlayers.length; i++) {
                                if (arrayPlayers[i].player_id == game_player) {
                                    player = arrayPlayers[i];
                                }
                            }
                            arrayGames[i].game_player = player;
                            updateGameSessionBD(game_sDate, game_desc, player.player_id, arrayGames[i].game_id);
                            openGameSessions();
                            return;
                        }
                    }
                }
            }
        case "Add":
            if (game_sDate.split("/")[0] == "dd"
                || game_sDate.split("/")[1] == "mm"
                || game_sDate.split("/")[2] == "yyyy"
                || game_desc == ""
                || game_player == "") {
                alert("Insert valid values!");
                return;
            } else {
                let player = null;
                for (let i = 0; i < arrayPlayers.length; i++) {
                    if (arrayPlayers[i].player_id == game_player) {
                        player = arrayPlayers[i];
                    }
                }
                arrayGames.push(new GameSession(new Date(game_sDate), game_desc, player));
                insertGameBD(game_sDate, game_desc, player.player_id);
                openGameSessions();
                return;
            }
    }
}

/**
 * Remove uma game session
 */
function removeSession() {
    if (selectedGameSessionID != void 0) {
        arrayGames.forEach(function (game, index) {
            if (selectedGameSessionID == game.game_id) {
                arrayGames.splice(index, 1);
                deleteGameSessionBD(selectedGameSessionID);
            }
        });
        openGameSessions();
    } else {
        alert("Choose the game session you want to remove!");
    }
}

/**
 * Cria um fragment com a lista de jogadores e insere numa tag select
 */
function playerList() {
    var select = document.getElementById("playerList");
    select.innerHTML = '';
    var fragment = document.createDocumentFragment();

    arrayPlayers.forEach(function (player, index) {
        var option = document.createElement("option");
        option.innerHTML = player.player_id + " - " + player.player_name;
        option.value = player.player_id;
        fragment.appendChild(option);
    });

    select.appendChild(fragment);
}

/**
 * Limpa a lista de players
 */
function clearPlayerListOptions() {
    var select = document.getElementById("playerList");
    for (var i = select.options.length - 1; i >= 0; i--)
        select.remove(i);
}

// ************************STATISTICS************************

/**
 * Abre o separador que mostra o grafico com as estatisticas do jogador seleccionado
 * @param {Integer} id id do jogador
 */
function selectPlayerStats(id) {
    let player = void 0;
    for (let i = 0; i < arrayPlayers.length; i++) {
        if (arrayPlayers[i].player_id === id) {
            player = arrayPlayers[i];
        }
    }
    openPlayerStats();

    playerColumnGraph(playerTotalStats(id), player);
}

/**
 * Cria um gráfico com as estatisticas do jogador seleccionado
 * @param {Array} array array com as estatisticas do jogador 
 * @param {Player} player jogador seleccionado
 */
function playerColumnGraph(array, player) {
    document.getElementById("stats").firstElementChild.firstElementChild.textContent = player.player_name.toUpperCase() + " STATS";

    let dataArray = [];
    for (let i = 0; i < array.length; i++) {
        let data = {
            y: array[i].statTotalValue,
            label: array[i].statType
        }
        dataArray.push(data);
    }

    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "light2", // "light1", "light2", "dark1", "dark2"
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
    deleteElement("playersTable");
    deleteElement("gamesTable");
    if (array.length > 0) {
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
            let object = array[index];
            let tr = document.createElement("tr");
            for (let property in object) {

                var td = document.createElement("td");
                if (!(object[property] instanceof Function)) {

                    if (property.includes("_bday")) { //Se for a data de nascimento
                        td.textContent = calculateAge(object[property]); //adiciona a idade a celula
                    } else if (property.includes("_sDate")) {
                        var dateF = new Date(object[property]);
                        td.textContent = dateF.toISOString().split("T")[0];
                    } else {
                        td.textContent = object[property]; //adiciona o valor a uma celula
                    }

                    tr.appendChild(td); //adiciona a celula a fila
                }

                if (array[0] instanceof Player) {
                    tr.onclick = function () { selectPlayer(tr.firstElementChild.textContent, tr) };
                } else if (array[0] instanceof GameSession) {
                    tr.onclick = function () { selectGameSession(tr.firstElementChild.textContent, tr) };
                } else if (property.includes("playerName")) {
                    tr.onclick = function () { selectPlayerStats(object.playerName.player_id) };
                }

                table.appendChild(tr); //adiciona a fila a tabela
            }

        }

        parent.appendChild(table); //adiciona a tabela ao elemento pai
    }
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

/**
 * verifica se o jogador existe
 * @param {Player} player 
 */
function playerExists(player) {
    for (var i = 0; i < arrayPlayers.length; i++) {
        if (arrayPlayers[i].player_id === player.player_id)
            return true;
    }
    return false;
}

/**
 * Verifica se a gameSession existe
 * @param {GameSession} game 
 */
function sessionExists(game) {
    for (let i = 0; i < arrayGames.length; i++) {
        if (arrayGames[i].game_id === game.game_id)
            return true;
    }
    return false;
}

/**
 * Verifica se o tipo de estatistica existe
 * @param {StatisticType} statType 
 */
function statTypeExists(statType) {
    for (let i = 0; i < arrayStatsTypes.length; i++) {
        if (arrayStatsTypes[i].statType_id === statType.statType_id)
            return true;
    }
    return false;
}

/**
 * Verifica se a estatistica existe
 * @param {Statistic} stats 
 */
function statsExists(stats) {
    for (let i = 0; i < arrayStats.length; i++) {
        if (arrayStats[i].stat_id === stats.stat_id)
            return true;
    }
    return false;
}

/**
 * Retorna o jogador cujo id corresponde ao id passado como argumento
 * @param {Integer} id 
 */
function searchPlayerByID(id) {
    for (let i = 0; i < arrayPlayers.length; i++) {
        if (id == arrayPlayers[i].player_id) {
            return arrayPlayers[i];
        }
    }
}

/**
 * Retorna o tipo de estatistica cujo id corresponde ao id passado como argumento
 * @param {Integer} id 
 */
function searchStatisticTypeByID(id) {
    for (let i = 0; i < arrayStatsTypes.length; i++) {
        if (id == arrayStatsTypes[i].statType_id) {
            return arrayStatsTypes[i];
        }
    }
}
// AJAX FUNCTIONS

//Players

/**
 * Busca os players à base de dados, cria os players e insere no Array
 */
function getPlayersBD() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/getPlayers", true);
    xhr.onreadystatechange = function () {
        if ((this.readyState === 4) && (this.status === 200)) {
            var response = JSON.parse(xhr.responseText);
            response.forEach(function (j) {
                var player = new Player(j.player_Name, j.player_Bday, j.player_Country, j.player_ID);
                if (arrayPlayers.lenght != 0) {
                    if (!playerExists(player)) {
                        arrayPlayers.push(player);
                    }
                } else
                    arrayPlayers.push(player);
            })
        }
    }
    xhr.send();
}

/**
 * Insere um player à base de dados
 * @param {*} player_name 
 * @param {*} player_bday 
 * @param {*} player_country 
 */
function insertPlayerBD(player_name, player_bday, player_country) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/insertPlayer");
    var obj = {
        player_name: player_name,
        player_bday: player_bday,
        player_country: player_country
    }
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(obj));
}

/**
 * Apaga um player da base de dados
 * @param {*} player_id 
 */
function deletePlayerBD(player_id) {
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/deletePlayer");
    var obj = {
        player_id: player_id
    }

    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(obj));

}

/**
 * Edita um player na base de dados
 * @param {*} player_name 
 * @param {*} player_bday 
 * @param {*} player_country 
 * @param {*} player_id 
 */
function updatePlayerBD(player_name, player_bday, player_country, player_id) {
    var xhr = new XMLHttpRequest();
    xhr.open("PATCH", "/updatePlayer");
    var obj = {
        player_name: player_name,
        player_bday: player_bday,
        player_country: player_country,
        player_id: player_id
    }
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(obj));

}

//GameSessions


/**
 * Busca as game sessions à base de dados, cria as game sessions e insere no Array
 */
function getGameSessionsBD() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/getGameSessions", true);
    xhr.onreadystatechange = function () {
        if ((this.readyState === 4) && (this.status === 200)) {
            var response = JSON.parse(xhr.responseText);
            response.forEach(function (j) {
                var player = searchPlayerByID(j.game_Player_ID);
                var game = new GameSession(j.game_SDate, j.game_Desc, player, j.game_ID);
                if (arrayPlayers.lenght != 0) {
                    if (!sessionExists(game)) {
                        arrayGames.push(game);
                    }
                } else
                    arrayGames.push(game);
            })
        }
    }
    xhr.send();
}

/**
 * Insere uma game session na base de dados
 * @param {*} game_sdate 
 * @param {*} game_desc 
 * @param {*} game_player_id 
 */
function insertGameBD(game_sdate, game_desc, game_player_id) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/insertGameSession");
    var obj = {
        game_sdate: game_sdate,
        game_desc: game_desc,
        game_player_id: game_player_id
    }
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(obj));
}

/**
 * Apaga uma game session na base de dados
 * @param {*} game_id 
 */
function deleteGameSessionBD(game_id) {
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/deleteGameSession");
    var obj = {
        game_id: game_id
    }

    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(obj));

}

/**
 * Edita uma game session na base de dados
 * @param {*} game_sdate 
 * @param {*} game_desc 
 * @param {*} game_player_id 
 * @param {*} game_id 
 */
function updateGameSessionBD(game_sdate, game_desc, game_player_id, game_id) {
    var xhr = new XMLHttpRequest();
    xhr.open("PATCH", "/updateGameSession");
    var obj = {
        game_sdate: game_sdate,
        game_desc: game_desc,
        game_player_id: game_player_id,
        game_id: game_id
    }
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(obj));

}

// StatisticType
/**
 * Busca as Statistic Types à base de dados, cria as statisticTypes e insere no Array
 */
function getStatisticTypeBD() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/getStatisticTypes", true);
    xhr.onreadystatechange = function () {
        if ((this.readyState === 4) && (this.status === 200)) {
            var response = JSON.parse(xhr.responseText);
            response.forEach(function (j) {
                var statisticType = new StatisticType(j.statType_Name, j.statType_Desc, j.statType_ID);
                if (arrayStatsTypes.lenght != 0) {
                    if (!statTypeExists(statisticType)) {
                        arrayStatsTypes.push(statisticType);
                    }
                } else
                    arrayStatsTypes.push(statisticType);
            })
        }
    }
    xhr.send();
}


//Statistic
/**
 * Busca as statitics à base de dados, cria os statistics e insere no Array
 */
function getStatisticBD() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/getStatistics", true);
    xhr.onreadystatechange = function () {
        if ((this.readyState === 4) && (this.status === 200)) {
            var response = JSON.parse(xhr.responseText);
            response.forEach(function (j) {
                var statisticType = searchStatisticTypeByID(j.stat_StatType_ID);
                var statistic = new Statistic(j.stat_Value, statisticType, j.stat_Game_ID, j.stat_ID);
                if (arrayStats.lenght != 0) {
                    if (!statsExists(statistic)) {
                        arrayStats.push(statistic);
                    }
                } else
                    arrayStats.push(statistic);
            })
        }
    }
    xhr.send();
}