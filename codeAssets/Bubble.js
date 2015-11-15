function Bubble(g,x,y)
{
	var gameObj = g;
	var playerObj;
	var typeString;// Bubble type ("good" or "bad")
	var xPos = x;
	var yPos = y;
	var sprite;
	var detectionRange = [200,240];// Distance at which bubble activates (good/bad)
	var speed = [0.002,0.005];
	var popDistance = [80,40];
	var effect = 10;
	var badcounter = 1;
	var goodcounter = 1;
	this.init = function(t,p)
	{
		this.playerObj = p;
		this.typeString = t;
		if(this.typeString == "good")
		{
			this.sprite = gameObj.add.sprite(0, 0, "goodBubble");
		}else{
			this.sprite = gameObj.add.sprite(0, 0, "badBubble");
		}
		this.sprite.anchor.setTo(0.5,0.5);
		this.sprite.animations.add("idle", [0,1], 3, true);
		this.sprite.animations.play("idle");
	}
	this.update = function()
	{
		var distance = Math.sqrt((this.sprite.x - this.playerObj.getSprite().x)*(this.sprite.x - this.playerObj.getSprite().x)+(this.sprite.y - this.playerObj.getSprite().y)*(this.sprite.y - this.playerObj.getSprite().y));
		
		if(this.typeString == "good")
		{
			if(distance <= detectionRange[0])
			{
				xPos += (xPos - this.playerObj.getSprite().x) * speed[0];
				yPos += (yPos - this.playerObj.getSprite().y) * speed[0];
				if(distance <= popDistance[0])
				{
					this.playerObj.changeHealth(effect*2);
					this.playerObj.addPoint()
					window.open("assets/good/" + (goodcounter++) + ".png");
					xPos = -1000;
					yPos = -1000;
				}
			}
		}else{
			if(distance <= detectionRange[1])
			{
				xPos = xPos - (xPos - this.playerObj.getSprite().x) * speed[1];
				yPos = yPos - (yPos - this.playerObj.getSprite().y) * speed[1];
				if(distance <= popDistance[1])
				{
					this.playerObj.changeHealth(-effect);
					window.open("assets/bad/" + (badcounter++) + ".png");
					xPos = -1000;
					yPos = -1000;
				}
			}
		}
		this.sprite.x = xPos;
		this.sprite.y = yPos;
	}

}	
