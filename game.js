document.addEventListener("DOMContentLoaded", function () {

var s; // sprite reference placeholder
var speed = 4;

var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, "our-game", {
	preload: preload,
	create: create,
	update: update,
	render: render
});

function preload () {
	
	game.load.image("man", "assets/man.png");
	
}


function create () {
	
	s = game.add.sprite(game.world.centerX, game.world.centerY, "man");
	
}

function update () {
	
	if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
		s.x -= speed;
		
	} else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
		s.x += speed;
		
	}
	
	if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
		s.y -= speed;
		
	} else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
		s.y += speed;
		
	}
	
}

function render () {
	
	game.debug.spriteInfo(s, 20, 32);
	
}

});
