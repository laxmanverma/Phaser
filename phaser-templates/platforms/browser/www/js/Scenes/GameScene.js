class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
  }

  preload () {
    // load images
    this.load.image('down', 'assets/down.png');
  }

  create () {
    this.add.image(400, 300, 'down');
  }
}
