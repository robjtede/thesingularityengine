document.addEventListener("DOMContentLoaded", function () {

var player; // player sprite
var world; // world collision group
var map; // tilemap

var cursors; // controls

var speed = 300; // character movement speed

var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, "our-game", {
	preload: preload,
	create: create,
	update: update,
	render: render
});
var fader = new Box(game);

function preload () {
	
	game.load.image("world", "assets/world.jpg");
	game.load.image("man", "assets/man.png");
	game.load.image("box", "assets/box.png");
	game.load.tilemap("map", "assets/tilemap.csv", null, Phaser.Tilemap.CSV);
	
}


function create () {
	
	game.stage.backgroundColor = 0x999999;
	
	map = game.add.tilemap("map", 200, 200);
	map.addTilesetImage("world");
	
	world = map.createLayer(0);
	world.resizeWorld();
	map.setCollisionBetween(0, 1);
	world.debug = true;
	
	game.physics.startSystem(Phaser.Physics.ARCADE);
	
	player = game.add.sprite(game.world.centerX, game.world.centerY, "man");
	game.physics.enable(player, Phaser.Physics.ARCADE);
	player.body.setSize(50, 80, 0, 0);
	
	game.camera.follow(player);
	
	
	
	
	s = game.add.sprite(game.world.centerX, game.world.centerY, "man");
	fader.init();
} // create()

function update () {
	
	game.physics.arcade.collide(player, world);
	
	player.body.velocity.set(0);
	
	if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
		player.body.velocity.x = -speed;
		
	} else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
		player.body.velocity.x = speed;
		
	} else {
		player.body.velocity.x = 0;
		
	}
	
	if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
		player.body.velocity.y = -speed;
		
	} else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
		player.body.velocity.y = speed;
		
	} else {
		player.body.velocity.y = 0;
		
	}
	
	
}// update()

function collision (p, obj) {
	
	console.log(p.body.touching);
	
}// collision()

function render () {
	
	game.debug.spriteInfo(player, 20, 32);
	
}// render()

});
