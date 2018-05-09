var arrayPlayers = [
    new Player("João", "08/08/2008", "PT"),
    new Player("Joana", "09/09/2009", "PT"),
    new Player("Miguel", "10/10/2010", "PT"),
    new Player("Manuela", "11/11/2011", "PT"),
    new Player("Manuel", "12/12/2012", "PT")
];
var arrayGames = [
    new GameSession("07/05/2018","Level 1 - Origins","João"),
    new GameSession("06/04/2018","Level 2 - Going On","João"),
    new GameSession("05/03/2018","Level 1 - Origins","Joana")
];
var arrayStats = [];
var arrayStatsTypes = [];

/*
    new Player("João","08/08/2008","PT"),
    new Player("Joana","09/09/2009","PT"),
    new Player("Miguel","10/10/2010","PT"),
    new Player("Manuela","11/11/2011","PT"),
    new Player("Manuel","12/12/2012","PT")
*/

var active_tab = "home";

/* Visuais */

/**
 * Escurece o fundo do separador ativo
 * @param {*} tab 
 */
function highlightSelectedTab(tab) {
    switch (tab) {
        case "home":
            document.getElementsByTagName("nav").firstChild.style.backgroundColor = "dimgray";
            console.log(document.getElementsByTagName("nav").childNodes[0]);
            break;
        case "players":
            document.getElementsByTagName("nav").childNodes[1].style.backgroundColor = "dimgray";
            break;
        case "gameSessions":
            document.getElementsByTagName("nav").childNodes[2].style.backgroundColor = "dimgray";
            break;
        case "stats":
            document.getElementsByTagName("nav").childNodes[3].style.backgroundColor = "dimgray";
            break;
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
}

/**
 * Se existe um elemento com o id passado como argumento, apaga-o.
 * @param {*} id 
 */
function deleteElement(id){
    var elem = document.getElementById(id);
    if(elem !== null){
        elem.parentNode.removeChild(elem);
    }
}

/* Abrir e Fechar Separadores */
function openHome() {
    closeTabs();
    document.getElementById("home").style.display = "block";
    //highlightSelectedTab("home");
}

function openPlayers() {
    closeTabs();
    document.getElementById("players").style.display = "block";
    document.getElementById("playersButtons").style.display ="block";
    document.getElementById("addPlayers").style.display = "none";
    createTable(arrayPlayers);
    //highlightSelectedTab("players");
}

function openGameSessions() {
    closeTabs();
    document.getElementById("gameSessions").style.display = "block";
    createTable(arrayGames);
    //highlightSelectedTab("gameSessions");
}

function openStats() {
    closeTabs();
    document.getElementById("stats").style.display = "block";
    //highlightSelectedTab("stats");
}

function openCreatePlayer() {
    openPlayers();
    document.getElementById("playersTable").style.display = "none";
    document.getElementById("playersButtons").style.display = "none";
    document.getElementById("addPlayers").style.display = "block";
}

function openEdit() {

}

/* Controladores */

// ************************PLAYERS************************

var selectedPlayerID = void 0;

function selectPlayer(id){
    selectedPlayerID = id;
}

/**
 * Creates a player and puts in the array
 */
function addPlayer(){
//var oldName = getCheckedName("playersTable");
//var player_id = document.getElementById("player_id").value;
var player_name = document.getElementById("player_name").value;
var player_bday = document.getElementById("player_bday").value;
var player_country = document.getElementById("player_country").value;

/*if(selectedPlayer != void 0){
    var exists = false;
    arrayPlayers.forEach(function(player,index){
        if(player_name === player.player_name){
            exists = true;
            alert("This player already exists!");
            return;
        }
    }, this);
    if(!exists){
        selectedPlayer.player_name = player_name;
        selectedPlayer.player_bday = player_bday;
        selectedPlayer.player_country = player_country;
        playersTable();
        return;
    }
    
}else {*/
    var exist = false;
    for(var i= 0; i < arrayPlayers.length; i++){
        if(player_name === arrayPlayers[i].player_name){
            exists = true;
            alert("This player already exists!");
            return;
        }else if(
            player_name == "" 
            || player_bday.split("/")[0] == "dd"
            || player_bday.split("/")[1] == "mm"
            || player_bday.split("/")[2] == "yyyy"
            || player_country == "") {
                exist = true;
                alert("Insert valid values!");
                return;
            }
        }
        if(!exist){
            arrayPlayers.push(new Player(player_name, player_bday, player_country));
            openPlayers();
            return;
        }
    //}
}

// ************************GAME SESSIONS************************



/* Criação de Tabelas */

/**
 * Cria uma tabela para o array recebido.
 * @param {*} array 
 */
function createTable(array) {
    //Verifica qual a tabela
    if(array[0] instanceof Player){
        deleteElement("playersTable"); //Apaga a tabela para reconstruir
        var table = document.createElement("table");
        table.id = "playersTable"; //Adiciona ID a tabela
        var parent = document.getElementById("players").firstElementChild; //Vai buscar o elemento pai
    } else if(array[0] instanceof GameSession){
        deleteElement("gamesTable");
        var table = document.createElement("table");
        table.id = "gamesTable";
        var parent = document.getElementById("gameSessions").firstElementChild;
    }

    table.appendChild(tableHeader(array)); //Adiciona o cabecalho

    //Cria a tabela
    for (let index in array) {
        var player = array[index];
        var tr = document.createElement("tr");
        for (let property in player) {
            var td = document.createElement("td");
            td.textContent = player[property]; //adiciona o valor a uma celula
            tr.appendChild(td); //adiciona a celula a fila
        }
        tr.onclick(selectPlayer(tr.firstElementChild.textContent));
        table.appendChild(tr); //adiciona a fila a tabela
    }

    parent.appendChild(table); //adiciona a tabela ao elemento pai
}

/**
 * Cria o cabecalho da tabela relativo ao array passado como argumento.
 * @param {*} array 
 */
function tableHeader(array) {
    var thr = document.createElement("tr");

    var element = array[0];
    //Texto de cada celula do cabecalho, muda dependendo da propriedade
    for (let property in element) {

        var th = document.createElement("th");

        if (property.includes("_id")) {
            th.textContent = "ID";
            thr.appendChild(th);
        }
        else if (property.includes("_name")) {
            th.textContent = "Name";
            thr.appendChild(th);
        }
        else if (property.includes("_bday")) {
            th.textContent = "Birthday";
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
        }
        else {
            th.textContent = property;
            thr.appendChild(th);
        }
    }
    return thr;
}