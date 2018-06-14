USE projetoPI;

insert into player(player_Name, player_Bday, player_Country) values ("João Souza", "2008-08-08", "PT");
insert into player(player_Name, player_Bday, player_Country) values ("Joana Alves", "2009-09-09", "PT");
insert into player(player_Name, player_Bday, player_Country) values ("Miguel Campos", "2010-10-10", "PT");
insert into player(player_Name, player_Bday, player_Country) values ("Pedro Arruda", "2011-11-11", "PT");
insert into player(player_Name, player_Bday, player_Country) values ("Maria Rosado", "2012-12-12", "PT");
insert into player(player_Name, player_Bday, player_Country) values ("Arturo Roman", "2000-01-01", "ES");
insert into player(player_Name, player_Bday, player_Country) values ("Xue Ying", "1996-10-07", "CN");

insert into gameSession(game_SDate, game_Desc, game_Player_ID) values ("2018-04-08", "Stage 1", 1);
insert into gameSession(game_SDate, game_Desc, game_Player_ID) values ("2018-04-08", "Stage 2", 2);
insert into gameSession(game_SDate, game_Desc, game_Player_ID) values ("2018-04-08", "Stage 5", 3);
insert into gameSession(game_SDate, game_Desc, game_Player_ID) values ("2018-04-08", "Stage 2", 4);
insert into gameSession(game_SDate, game_Desc, game_Player_ID) values ("2018-04-08", "Stage 3", 5);
insert into gameSession(game_SDate, game_Desc, game_Player_ID) values ("2018-04-08", "Stage 1", 6);
insert into gameSession(game_SDate, game_Desc, game_Player_ID) values ("2018-04-08", "Stage 9", 7);

insert into statisticType(statType_Name, statType_Desc) values("Game Time","Total game time in minutes");
insert into statisticType(statType_Name, statType_Desc) values("Deaths","Number of times that died");
insert into statisticType(statType_Name, statType_Desc) values("Coins Gathered","Number of coins gathered");
insert into statisticType(statType_Name, statType_Desc) values("Destroyed Boxes","Number of destroyed boxes");
insert into statisticType(statType_Name, statType_Desc) values("Kills","Number of enemies killed");

insert into statistic(stat_Value, stat_Game_ID, stat_StatType_ID) values(240,1,1);
insert into statistic(stat_Value, stat_Game_ID, Stat_StatType_ID) values(5,1,2);
insert into statistic(stat_Value, stat_Game_ID, Stat_StatType_ID) values(22,1,3);
insert into statistic(stat_Value, stat_Game_ID, Stat_StatType_ID) values(10,1,4);
insert into statistic(stat_Value, stat_Game_ID, Stat_StatType_ID) values(55,1,5);

insert into statistic(stat_Value, stat_Game_ID, Stat_StatType_ID) values(446,2,1);
insert into statistic(stat_Value, stat_Game_ID, Stat_StatType_ID) values(7,2,2);
insert into statistic(stat_Value, stat_Game_ID, Stat_StatType_ID) values(49,2,3);
insert into statistic(stat_Value, stat_Game_ID, Stat_StatType_ID) values(16,2,4);
insert into statistic(stat_Value, stat_Game_ID, Stat_StatType_ID) values(123,2,5);

insert into statistic(stat_Value, stat_Game_ID, Stat_StatType_ID) values(180,3,1);
insert into statistic(stat_Value, stat_Game_ID, Stat_StatType_ID) values(5,3,2);
insert into statistic(stat_Value, stat_Game_ID, Stat_StatType_ID) values(27,3,3);
insert into statistic(stat_Value, stat_Game_ID, Stat_StatType_ID) values(12,3,4);
insert into statistic(stat_Value, stat_Game_ID, Stat_StatType_ID) values(48,3,5);

insert into statistic(stat_Value, stat_Game_ID, Stat_StatType_ID) values(150,4,1);
insert into statistic(stat_Value, stat_Game_ID, Stat_StatType_ID) values(10,4,2);
insert into statistic(stat_Value, stat_Game_ID, Stat_StatType_ID) values(20,4,3);
insert into statistic(stat_Value, stat_Game_ID, Stat_StatType_ID) values(5,4,4);
insert into statistic(stat_Value, stat_Game_ID, Stat_StatType_ID) values(38,4,5);

insert into statistic(stat_Value, stat_Game_ID, Stat_StatType_ID) values(200,5,1);
insert into statistic(stat_Value, stat_Game_ID, Stat_StatType_ID) values(4,5,2);
insert into statistic(stat_Value, stat_Game_ID, Stat_StatType_ID) values(21,5,3);
insert into statistic(stat_Value, stat_Game_ID, Stat_StatType_ID) values(9,5,4);
insert into statistic(stat_Value, stat_Game_ID, Stat_StatType_ID) values(50,5,5);

insert into statistic(stat_Value, stat_Game_ID, Stat_StatType_ID) values(497,6,1);
insert into statistic(stat_Value, stat_Game_ID, Stat_StatType_ID) values(20,6,2);
insert into statistic(stat_Value, stat_Game_ID, Stat_StatType_ID) values(54,6,3);
insert into statistic(stat_Value, stat_Game_ID, Stat_StatType_ID) values(15,6,4);
insert into statistic(stat_Value, stat_Game_ID, Stat_StatType_ID) values(68,6,5);

insert into statistic(stat_Value, stat_Game_ID, Stat_StatType_ID) values(1023,7,1);
insert into statistic(stat_Value, stat_Game_ID, Stat_StatType_ID) values(3,7,2);
insert into statistic(stat_Value, stat_Game_ID, Stat_StatType_ID) values(97,7,3);
insert into statistic(stat_Value, stat_Game_ID, Stat_StatType_ID) values(54,7,4);
insert into statistic(stat_Value, stat_Game_ID, Stat_StatType_ID) values(350,7,5);