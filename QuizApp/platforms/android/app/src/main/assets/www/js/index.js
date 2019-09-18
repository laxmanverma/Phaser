document.addEventListener('deviceready', function() {
    var config = {
        type: Phaser.WEBGL,
        parent: 'game',
        width: 800,
        height: 480,
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };

    var game = new Phaser.Game(config);

    function resize() {
        var canvas = game.canvas, width = window.innerWidth, height = window.innerHeight;
        var wratio = width / height, ratio = canvas.width / canvas.height;

        if (wratio < ratio) {
            canvas.style.width = width + "px";
            canvas.style.height = (width / ratio) + "px";
        } else {
            canvas.style.width = (height * ratio) + "px";
            canvas.style.height = height + "px";
        }
    }

    function preload() {
        this.load.atlas('sheet', 'img/sheet.png', 'img/sheet.json');
    }

    function create() {
        window.addEventListener('resize', resize);
        resize();

        this.anims.create({
            key: 'plane',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('sheet', { start: 1,  end: 3, prefix: 'planeBlue', suffix: '.png' })
        });

        this.bg = this.add.tileSprite(0, 0, 800, 480, 'sheet', 'background.png').setOrigin(0);
        var plane = this.add.sprite(400, 300, 'sheet').play('plane');
    }

    function update() {
        this.bg.tilePositionX += 5;
    }
});