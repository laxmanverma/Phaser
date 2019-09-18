var isMobile;
var game;

window.onload = function() {
    isMobile = navigator.userAgent.indexOf("Mobile");
    if (isMobile == -1) {
        isMobile = navigator.userAgent.indexOf("Tablet");
    }
    if (isMobile == -1) {
        var config = {
            type: Phaser.AUTO,
            width: 480,
            height: 640,
            parent: 'phaser-game'
        };
    } else {
        var config = {
            type: Phaser.AUTO,
            width: window.innerWidth,
            height: window.innerHeight,
            parent: 'phaser-game'
        };
    }

    game = new Phaser.Game(config);
    if (isMobile == -1) {
        game.scale.scaleMode = Phaser.ScaleModes.NEAREST;
        // Center the game horizontally and vertically
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        // game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        // game.scale.setScreenSize(true);
    }
    game.scene.add('SceneMain', SceneMain);
    game.scene.add('Lobby', Lobby);
    game.scene.start('SceneMain');
};
