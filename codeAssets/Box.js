function Box(g) //Parsing the game object
{
	var gameObj = g; //Game object reference
	this.init = function()
	{
		this.sprites = []
		for (var i = 0; i<4; i++)
		{
			this.sprites[i] = gameObj.add.sprite(gameObj.world.centerX, gameObj.world.centerY, "boxFade");
			this.sprites[i].anchor.setTo(0.5,0);
		}
		
		this.sprites[1].angle = 180;
		this.sprites[2].angle = 90;
		this.sprites[3].angle = -90;

	}
}
