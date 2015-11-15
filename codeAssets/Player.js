function Player(g,w,f)
{
	var gameObj = g;
	var worldObj = w;
	var faderObj = f;
	var sprite;
	var speed = 300;
	var health = 100;
	var points = 0;
	var healthLoss = 0.05;
	this.init = function()
	{	
		this.sprite = gameObj.add.sprite(gameObj.world.centerX, gameObj.world.centerY, "man", 0);
		this.sprite.anchor.setTo(0.5,0.5);
		this.sprite.animations.add("backwards", [9, 11, 10, 11], 5, true);
		this.sprite.animations.add("forwards", [1, 0, 2, 0], 5, true);
		this.sprite.animations.add("left", [4, 3, 5, 3], 5, true);
		this.sprite.animations.add("right", [6, 8, 7, 8], 5, true);
		gameObj.physics.enable(this.sprite, Phaser.Physics.ARCADE);
		this.sprite.body.setSize(50, 80, 0, 0);
		gameObj.camera.follow(this.sprite);

	}
	this.update = function()
	{
		this.changeHealth(-healthLoss);
		faderObj.setRatio(health/100);	
		this.sprite.body.velocity.set(0);
		if (gameObj.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
			this.sprite.body.velocity.x = -speed;
			this.sprite.play("left");
			
		} else if (gameObj.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
			this.sprite.body.velocity.x = speed;
			this.sprite.play("right");
			
		} else if (gameObj.input.keyboard.isDown(Phaser.Keyboard.UP)) {
			this.sprite.body.velocity.y = -speed;
			this.sprite.play("backwards");
			
		} else if (gameObj.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
			this.sprite.body.velocity.y = speed;
			this.sprite.play("forwards");
			
		} else {
			this.sprite.body.velocity.y = 0;
			this.sprite.animations.stop();
		}
	
	}
	this.getX = function()
	{
		return (this.sprite.x);
	}
	this.getY = function()
	{
		return (this.sprite.y);
	}
	this.getSprite = function()
	{
		return (this.sprite);
	}
	this.changeHealth = function(amount)
	{
		health = Math.min(Math.max(health + amount,0),100);
	}
	this.addPoint = function()
	{
		this.points = this.points + 1;
	}
	this.getHealth = function()
	{
		return (health);
	}
}
