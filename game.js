document.addEventListener("DOMContentLoaded", function () {

var world; // world collision group
var map; // tilemap

var cursors; // controls

var speed = 200; // character movement speed

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
	
	game.load.image("world", "assets/map2.png");
	game.load.tilemap("map", "assets/tilemap.csv", null, Phaser.Tilemap.CSV);
	
	game.load.spritesheet("man", "assets/guy.png", 50, 80);
	game.load.spritesheet("boxFade", "assets/fade.png", 1000, 200, 3);
	
	game.load.spritesheet("goodBubble", "assets/goodBubble.png", 28, 25, 2);
	game.load.spritesheet("badBubble", "assets/badBubble.png", 28, 25, 2);
	
	music.init(playlist);

	for (var i = 0; i<100; i++) {
		goodBubbles[i] = new Bubble(game, Math.random()*6000 + 600, Math.random() * 2000 + 400);
		badBubbles[i] = new Bubble(game, Math.random()*6000 + 600, Math.random() * 2000 + 400);
	}
	
}// preload()


function create () {
	
	game.stage.backgroundColor = 0x999999;
	
	map = game.add.tilemap("map", 100, 100);
	map.addTilesetImage("world");

	music.create(this);
	
	game.physics.startSystem(Phaser.Physics.ARCADE);
	world = map.createLayer(0);
	world.resizeWorld();
	world.debug = true;
	
	// collisions
	map.setCollisionBetween(0, 1);
	
	player.init();
	//bubble.init("bad", player);
	for (var i = 0; i<100; i++) {
		goodBubbles[i].init("good", player);
		badBubbles[i].init("bad", player);
	}
	
	game.camera.follow(player.getSprite());
	
	fader.init();
	
}// create()

function update () {
	
	fader.moveTo(player.getX(), player.getY());
	fader.update();
	//bubble.update();
	
	for (var i = 0; i<100; i++) {
		goodBubbles[i].update();
		badBubbles[i].update();
	}
	
	game.physics.arcade.collide(player.getSprite(), world);
	player.update();
	
	if (player.getHealth() == 0) {
		window.location.href = "end.html";
	}
	
}// update()

function render () {
	
	game.debug.spriteInfo(player.getSprite(), 20, 32);
	music.debug();
	
}// render()

});
