drop database if exists projetoPI;

create database if not exists projetoPI;

USE projetoPI;


DROP TABLE IF EXISTS player;
DROP TABLE IF EXISTS gameSession;
DROP TABLE IF EXISTS statisticType;
DROP TABLE IF EXISTS statistic;

CREATE TABLE player(
player_ID int not null auto_increment,
player_Name varchar(50) not null,
player_Bday varchar(10) not null,
player_Country varchar(50) not null,
primary key(player_ID));

CREATE TABLE gameSession(
game_ID int not null auto_increment,
game_SDate varchar(10) not null,
game_Desc varchar(200) not null,
game_Player_ID int not null,
primary key(game_ID),
foreign key(game_Player_ID) references player(player_ID)
ON DELETE CASCADE);

CREATE TABLE statisticType(
statType_ID int not null auto_increment,
statType_Name varchar(50) not null,
statType_Desc varchar(200) not null,
primary key(statType_ID));

CREATE TABLE statistic(
stat_ID int not null auto_increment,
stat_Value float(10) not null,
stat_Game_ID int not null,
stat_StatType_ID int not null,
primary key(stat_ID),
foreign key(stat_Game_ID) references gameSession(game_ID) 
ON DELETE CASCADE,
foreign key(stat_StatType_ID) references statisticType(statType_ID));






