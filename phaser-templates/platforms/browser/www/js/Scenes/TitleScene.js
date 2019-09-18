class TitleScene extends Phaser.Scene {
  constructor () {
    super({key: 'TitleScene'});
  }

  preload () {
    this.load.image('logo', 'assets/logo.png');
  }

  create () {
    let background = this.add.sprite(0,0, 'logo');
    background.setOrigin(0,0);
    this.add.text(20, 20, "Loading game...");
    var delayInMilliseconds = 1000;
    var text2 = this.add.text(200, 20, "1");
    text2.setColor('red');
    var self = this;
    setTimeout(function () {
      text2.destroy();
      var t3 = self.add.text(200, 20, "5");
      t3.setColor('red');
      setTimeout(function () {
        self.scene.start("Game");
      }, delayInMilliseconds);
    }, delayInMilliseconds);
  }
}
