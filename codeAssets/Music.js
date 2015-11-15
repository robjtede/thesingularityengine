function Music(game) {

    var gameObj = game; //game object reference
    var highMusic, midMusic, lowMusic;

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
        highMusic.play("", 0, 0.7, true);
        midMusic.play("", 0, 0.5, true);
        lowMusic.play("", 0, 0.3, true);
    }

    this.debug = function() {
        gameObj.debug.soundInfo(highMusic, 20,500);
        gameObj.debug.soundInfo(midMusic, 20,200);
    }

}