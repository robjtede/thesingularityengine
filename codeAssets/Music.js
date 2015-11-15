function Music(game) {

    var gameObj = game; //game object reference
    var highMusic, midMusic, lowMusic;
	var maxMusic = 0.8;

    this.init = function(filepaths) {
       gameObj.load.audio('high', filepaths[0]);
       gameObj.load.audio('mid', filepaths[1]);
       gameObj.load.audio('low', filepaths[2]);

    }

    this.create = function(glob_ref) {
        highMusic = gameObj.add.audio('high');
        midMusic = gameObj.add.audio('mid');
        lowMusic = gameObj.add.audio('low');
        this.start();
    }

    this.start = function() {
        //Params: marker, position (of marker), volume, loop boolean
        highMusic.play("", 0, 0, true);
        midMusic.play("", 0, 0, true);
        lowMusic.play("", 0, 0, true);
    }
	this.setRatio = function(ratio) {
		ratio = ratio * 1.9 * Math.PI
		midMusic.volume = Math.max(Math.sin(ratio/2)*maxMusic, 0);
		if(ratio > Math.PI)
		{
			highMusic.volume = Math.max((Math.cos(ratio)+1)/2,0);
			lowMusic.volume = 0;
		}else{
			lowMusic.volume = Math.max((Math.cos(ratio)+1)/2,0);
			highMusic.volume = 0;
		}
	}

    this.debug = function() {
        gameObj.debug.soundInfo(highMusic, 20,500);
        gameObj.debug.soundInfo(midMusic, 20,200);
    }

}