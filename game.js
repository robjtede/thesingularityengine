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
	
	game.physics.startSystem(Phaser.Physics.ARCADE);
	
	player = game.add.sprite(game.world.centerX, game.world.centerY, "man", 0);
	player.animations.add("backwards", [9, 11, 10, 11], 5, true);
	player.animations.add("forwards", [1, 0, 2, 0], 5, true);
	player.animations.add("left", [4, 3, 5, 3], 5, true);
	player.animations.add("right", [6, 8, 7, 8], 5, true);
	
	game.physics.enable(player, Phaser.Physics.ARCADE);
	player.body.setSize(50, 80, 0, 0);
	
	game.camera.follow(player);
	
	
	fader.init();
} // create()

function update () {
	
	fader.moveTo(player.x, player.y);
	fader.update();

	game.physics.arcade.collide(player, world);
	
	player.body.velocity.set(0);
	
	if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
		player.body.velocity.x = -speed;
		player.play("left");
		
	} else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
		player.body.velocity.x = speed;
		player.play("right");
		
	} else if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
		player.body.velocity.y = -speed;
		player.play("backwards");
		
	} else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
		player.body.velocity.y = speed;
		player.play("forwards");
		
	} else {
		player.body.velocity.y = 0;
		player.animations.stop();
		
	}

	if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
		fader.setRatio(0);
	}
	
	
}// update()

function collision (p, obj) {
	
	console.log(p.body.touching);
	
}// collision()

function render () {
	
	game.debug.spriteInfo(player, 20, 32);
	
}// render()

});
