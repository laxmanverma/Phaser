const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

var Lobby = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Lobby () {
        Phaser.Scene.call(this, { key: 'Lobby' });
    },


    init: function (data)
    {
        this.player_id = data.player_id;
        this.username = data.username;
    },

    preload: function () {
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/plugins/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });
    },

    create: function () {
        var data = {
            name: 'Rex',
            skills: [{
                name: 'A'
            },
                {
                    name: 'B'
                },
                {
                    name: 'C'
                },
                {
                    name: 'D'
                },
                {
                    name: 'E'
                },
            ],
            items: [{
                name: 'A'
            },
                {
                    name: 'B'
                },
                {
                    name: 'C'
                },
                {
                    name: 'D'
                },
                {
                    name: 'E'
                },
                {
                    name: 'F'
                },
                {
                    name: 'G'
                },
                {
                    name: 'H'
                },
                {
                    name: 'I'
                },
                {
                    name: 'J'
                },
                {
                    name: 'K'
                },
                {
                    name: 'L'
                },
                {
                    name: 'M'
                },
            ],

        };

        var scrollablePanel = this.rexUI.add.scrollablePanel({
            x: 5,
            y: 200,
            width: window.innerWidth,
            height: window.innerHeight,

            scrollMode: 1,

            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 10, COLOR_PRIMARY),

            panel: {
                child: createPanel(this, data),

                mask: {
                    padding: 1
                },
            },

            slider: {
                track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
                thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT),
            },

            // scroller: true,

            // space: {
            //     left: 10,
            //     right: 10,
            //     top: 10,
            //     bottom: 10,
            //
            //     panel: 10,
            // }
        }).layout();
        //.drawBounds(this.add.graphics(), 0xff0000);
        // ==============================
        var player_id = this.player_id;
        var username = this.username;
        var size = 10;
        var Y = 200;

        // for (var i=0;i<size;i++) {
        //     var rect = new Phaser.Geom.Rectangle(5, Y, window.innerWidth - 10, 100);
        //
        //     var graphics = this.add.graphics({ fillStyle: { color: 0xFFFFFF } });
        //
        //     graphics.fillRectShape(rect);
        //     graphics.setInteractive(rect, card);
        //     Y = Y + 105;
        // }

        function card() {
            console.log(username);
        }
    },

    update: function () {}

});

var createPanel = function (scene, data) {
    var sizer = scene.rexUI.add.sizer({
        orientation: 'x',
    }).add(
        createHeader(scene, data), // child
        0, // proportion
        'top', // align
        {
            right: 8,
        }, // paddingConfig
        true // expand
    )
        .add(
            createTable(scene, data, 'skills', 1), // child
            0, // proportion
            'top', // align
            {
                right: 8,
            }, // paddingConfig
            true // expand
        )
        .add(
            createTable(scene, data, 'items', 2), // child
            0, // proportion
            'top', // align
            0, // paddingConfig
            true // expand
        );
    return sizer;
};

var createHeader = function (scene, data) {
    var title = scene.rexUI.add.label({
        orientation: 'x',
        text: scene.add.text(0, 0, 'Character'),
    });
    var header = scene.rexUI.add.label({
        orientation: 'y',
        icon: scene.rexUI.add.roundRectangle(0, 0, 100, 100, 5, COLOR_LIGHT),
        text: scene.add.text(0, 0, data.name),

        space: {
            icon: 10,
        }
    });

    return scene.rexUI.add.sizer({
        orientation: 'y',
    })
        .addBackground(
            scene.rexUI.add.roundRectangle(0, 0, 0, 0, 0, undefined).setStrokeStyle(2, COLOR_LIGHT, 1)
        )
        .add(
            title, // child
            0, // proportion
            'left', // align
            5, // paddingConfig
            true // expand
        )
        .add(header, // child
            1, // proportion
            'center', // align
            5, // paddingConfig
            true // expand
        );
};

var createTable = function (scene, data, key, rows) {
    var capKey = key.charAt(0).toUpperCase() + key.slice(1);
    var title = scene.rexUI.add.label({
        orientation: 'x',
        text: scene.add.text(0, 0, capKey),
    });

    var items = data[key];
    var columns = Math.ceil(items.length / rows);
    var table = scene.rexUI.add.gridSizer({
        column: columns,
        row: rows,

        rowProportions: 1,
    });

    var item, r, c;
    var iconSize = (rows === 1) ? 80 : 40;
    for (var i = 0, cnt = items.length; i < cnt; i++) {
        item = items[i];
        r = i % rows;
        c = (i - r) / rows;
        table.add(
            createIcon(scene, item, iconSize, iconSize),
            c,
            r,
            'top',
            2,
            true
        );
    }

    return scene.rexUI.add.sizer({
        orientation: 'y',
    })
        .addBackground(
            scene.rexUI.add.roundRectangle(0, 0, 0, 0, 0, undefined).setStrokeStyle(2, COLOR_LIGHT, 1)
        )
        .add(
            title, // child
            0, // proportion
            'left', // align
            5, // paddingConfig
            true // expand
        )
        .add(table, // child
            1, // proportion
            'center', // align
            5, // paddingConfig
            true // expand
        );
};

var createIcon = function (scene, item, iconWidth, iconHeight) {
    return scene.rexUI.add.label({
        orientation: 'y',
        icon: scene.rexUI.add.roundRectangle(0, 0, iconWidth, iconHeight, 5, COLOR_LIGHT),
        text: scene.add.text(0, 0, item.name),

        space: {
            icon: 10,
        }
    })
};