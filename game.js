document.addEventListener("DOMContentLoaded", function () {

var world; // world collision group
var map; // tilemap

var cursors; // controls

var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, "our-game", {
	preload: preload,
	create: create,
	update: update,
	render: render
});

var fader = new Box(game);
var player = new Player(game, world, fader);
var music = new Music(game);
var playlist = ["assets/music/high.ogg", "assets/music/mid.ogg", "assets/music/low.ogg"];

function preload () {
	
	game.load.image("world", "assets/map.png");
	game.load.tilemap("map", "assets/tilemap.csv", null, Phaser.Tilemap.CSV);
	
	game.load.spritesheet("man", "assets/guy.png", 50, 80);
	game.load.spritesheet("boxFade", "assets/fade.png", 1000, 200, 3);
	music.init(playlist);
	
}


function create () {
	
	game.stage.backgroundColor = 0x999999;
	
	map = game.add.tilemap("map", 80, 80);
	map.addTilesetImage("world");

	music.create(this);
	
	world = map.createLayer(0);
	world.resizeWorld();
	map.setCollisionBetween(0, 1);

	player.init();
	fader.init();
	
} // create()

function update () {
	
	fader.moveTo(player.getX(), player.getY());
	fader.update();	
	player.update();
	
	if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
		fader.setRatio(0);
	}
}// update()

/*function collision (p, obj) {
	
	console.log(p.touching);
	
}// collision()
*/
function render () {
	
	game.debug.spriteInfo(player.getSprite(), 20, 32);
	music.debug();
	
}// render()

});
