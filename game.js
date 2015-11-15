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

function preload () {
	
	game.load.image("world", "assets/world.jpg");
	game.load.spritesheet("man", "assets/guy.png", 50, 80);
	game.load.image("box", "assets/box.png");
	game.load.tilemap("map", "assets/tilemap.csv", null, Phaser.Tilemap.CSV);
	game.load.spritesheet("boxFade", "assets/fade.png", 1000, 200, 3);
	
}


function create () {
	
	game.stage.backgroundColor = 0x999999;
	
	map = game.add.tilemap("map", 200, 200);
	map.addTilesetImage("world");
	
	world = map.createLayer(0);
	world.resizeWorld();
	map.setCollisionBetween(0, 1);
	world.debug = true;	
	
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
	
}// render()

});
