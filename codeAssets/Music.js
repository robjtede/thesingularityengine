function Music(game) {

    var gameObj = game; //game object reference
    var music;

    this.init = function(filepath) {
       gameObj.load.audio('bgMusic', filepath);

    }

    this.create = function(glob_ref) {
        music = gameObj.add.audio('bgMusic');
        this.start();
    }

    this.start = function() {
        music.play();
    }

    this.render = function(x, y) {
        gameObj.debug.soundInfo(music, x, y);
    }

}