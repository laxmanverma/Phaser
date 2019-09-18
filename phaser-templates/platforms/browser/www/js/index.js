// import TitleScene from "./Scenes/TitleScene";

let titleScene = new TitleScene();
let gameScene = new GameScene();

let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: 0xffff00,
  // scene: [titleScene,gameScene]
};
let  game = new Phaser.Game(config);
game.scene.add('TitleScene', titleScene);
game.scene.add('GameScene', gameScene);
game.scene.start('TitleScene');