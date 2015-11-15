document.addEventListener("DOMContentLoaded", function () {

var world; // world collision group
var map; // tilemap
var debug = true;

var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, "endoftheworld", {
	preload: preload,
	create: create,
	update: update,
	render: render
});

var fader = new Box(game);
var music = new Music(game);
var player = new Player(game, world, fader, music);
var playlist = ["assets/music/high.ogg", "assets/music/mid.ogg", "assets/music/low.ogg"];
var goodBubbles = [];
var badBubbles = [];
//var bubble = new Bubble(game, 5675,1000);

function preload () {
	
	game.load.image("world", "assets/map_hd.png");
	game.load.tilemap("map", "assets/tilemap.csv", null, Phaser.Tilemap.CSV);
	
	game.load.spritesheet("man", "assets/guy.png", 50, 80);
	game.load.spritesheet("boxFade", "assets/fade.png", 1000, 200, 3);
	
	game.load.spritesheet("goodBubble", "assets/goodBubble.png", 28, 25, 2);
	game.load.spritesheet("badBubble", "assets/badBubble.png", 28, 25, 2);
	
	music.init(playlist);
	
	placeBubble(goodBubbles, 151);
	placeBubble(goodBubbles, 393);
	placeBubble(goodBubbles, 434);
	placeBubble(goodBubbles, 207);
	placeBubble(goodBubbles, 587);
	placeBubble(goodBubbles, 698);
	placeBubble(goodBubbles, 1065);
	placeBubble(goodBubbles, 1128);
	placeBubble(goodBubbles, 1020);
	
	placeBubble(badBubbles, 224);
	placeBubble(badBubbles, 166);
	placeBubble(badBubbles, 486);
	placeBubble(badBubbles, 496);
	placeBubble(badBubbles, 786);
	placeBubble(badBubbles, 813);
	placeBubble(badBubbles, 1221);
	
	function placeBubble (toArr, tile) {
		
		var x = ((tile % 35) * 100) + 40;
		var y = (Math.floor(tile / 35) * 100) + 40;
		
		toArr.push( new Bubble(game, x, y) )
	}// placeBubble()
	
}// preload()


function create () {
	
	game.stage.backgroundColor = 0x999999;
	
	map = game.add.tilemap("map", 100, 100);
	map.addTilesetImage("world");

	music.create(this);
	
	game.physics.startSystem(Phaser.Physics.ARCADE);
	world = map.createLayer(0);
	world.resizeWorld();
	// world.debug = true;
	
	// collisions
	map.setCollision([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,77,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,120,121,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,167,168,169,170,171,172,173,174,175,202,203,204,205,206,208,209,210,211,213,214,224,225,226,244,245,246,251,252,253,256,257,258,259,260,261,262,263,264,265,276,277,279,280,281,282,283,284,285,286,287,288,289,290,291,292,293,294,295,296,297,298,299,300,301,302,303,304,305,306,311,312,313,314,315,316,317,318,319,320,321,322,323,324,325,326,327,328,329,330,331,332,333,334,335,336,337,338,339,340,341,342,346,347,348,349,350,351,352,353,354,355,356,357,358,359,360,361,362,363,364,365,366,367,368,369,370,371,372,373,374,375,376,377,378,382,383,384,385,386,387,388,395,396,397,398,399,400,401,402,405,406,407,408,409,410,411,412,413,417,418,419,420,421,422,425,426,427,428,429,430,431,437,440,441,442,443,444,445,446,447,452,453,454,455,456,457,460,461,462,463,464,465,466,467,468,469,470,471,472,478,479,480,481,488,489,490,491,492,493,499,500,501,507,523,524,525,526,527,528,530,531,532,533,534,537,538,539,540,541,542,553,554,555,556,557,558,559,560,561,562,580,581,583,584,585,586,588,589,590,591,592,593,594,595,596,597,606,608,609,615,616,623,624,625,626,627,628,629,630,631,632,635,641,649,650,651,664,665,666,667,670,671,672,673,674,675,676,677,678,679,680,681,682,683,684,685,686,699,700,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,753,754,755,756,757,758,759,760,761,762,763,764,765,766,767,768,769,770,771,772,773,774,775,776,777,779,780,781,782,788,789,790,,805,806,807,808,809,810,811,812,814,815,816,817,824,825,827,828,829,830,831,832,833,834,835,836,837,838,839,840,841,842,843,844,845,846,847,849,850,851,852,853,854,855,856,858,859,860,862,863,864,870,871,872,873,874,875,884,885,886,887,888,889,890,891,893,894,895,897,909,910,911,912,914,916,917,919,920,921,922,923,924,925,926,929,930,934,935,936,937,938,939,940,941,942,944,945,946,947,949,951,952,954,955,956,957,958,959,960,961,964,965,969,970,971,972,973,974,975,976,977,979,980,981,982,984,986,987,989,990,991,992,993,994,995,996,999,1000,1002,1003,1004,1005,1006,1007,1008,1009,1010,1011,1012,1014,1015,1016,1017,1019,1021,1022,1024,1025,1026,1027,1028,1029,1030,1031,1034,1035,1039,1040,1041,1042,1043,1044,1045,1046,1047,1048,1049,1050,1051,1061,1062,1063,1072,1074,1075,1076,1077,1078,1079,1080,1081,1082,1084,1085,1086,1089,1090,1091,1092,1093,1094,1095,1096,1097,1098,1107,1119,1120,1121,1129,1130,1131,1132,1133,1139,1147,1148,1154,1155,1156,1157,1158,1159,1160,1161,1162,1163,1164,1165,1166,1167,1168,1169,1170,1171,1172,1173,1174,1180,1181,1182,1183,1186,1187,1189,1190,1191,1192,1193,1194,1195,1196,1197,1198,1199,1200,1201,1202,1203,1204,1205,1206,1207,1208,1209,1215,1216,1221,1222,1224,1225,1226,1227,1228,1235,1236,1237,1238,1252,1253,1259,1260,1261,1262,1263,1270,1271,1272,1273,1284,1285,1287,1288,1294,1295,1296,1297,1298,1305,1306,1307,1308,1319,1320,1329,1330,1331,1332,1333,1353,1354,1355,1356,1357,1358,1359,1360,1361,1364,1365,1366,1367,1368,1388,1389,1390,1391,1392,1393,1394,1395,1396,1399,1400,1401,1402,1403,1432,1433,1434,1435,1436,1437,1438,1449,1450,1451,1452,1453,1458,1459,1460,1461,1462,1463,1464,1465,1466,1469,1470,1471,1472,1473,1475,1476,1477,1478,1479,1484,1485,1486,1487,1488,1493,1497,1498,1499,1500,1501,1504,1505,1506,1507,1508,1510,1511,1512,1513,1514,1519,1520,1521,1522,1523,1530,1539,1540,1541,1542,1543,1544,1545,1546,1547,1548,1549,1550,1551,1552,1553,1554,1555,1556,1557,1558,1559,1560,1561,1562,1563,1564,1565,1566,1567,1568,1569,1570,1571,1572,1573,1574]);
	
	player.init();
	//bubble.init("bad", player);

	
	goodBubbles.forEach(function (bubble) {
		bubble.init("good", player);
	});
	
	badBubbles.forEach(function (bubble) {
		bubble.init("bad", player);
	});
	
	game.camera.follow(player.getSprite());
	
	fader.init();
	
}// create()

function update () {
	
	fader.moveTo(player.getX(), player.getY());
	fader.update();
	
	game.physics.arcade.collide(player.getSprite(), world);
	player.update();
	
	goodBubbles.forEach(function (bubble) {
		bubble.update();
		game.physics.arcade.collide(bubble, world);
	});
	
	badBubbles.forEach(function (bubble) {
		bubble.update();
		game.physics.arcade.collide(bubble, world);
	});
	
	if (player.getHealth() == 0) {
		window.location.href = "end.html";
	}
	
}// update()

function render () {
	
	// game.debug.spriteInfo(player.getSprite(), 20, 32);
	// music.debug();
	
}// render()

});
