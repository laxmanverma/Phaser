// var app = {
//     // Application Constructor
//     initialize: function() {
//         document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
//     },
//
//     // deviceready Event Handler
//     //
//     // Bind any cordova events here. Common events are:
//     // 'pause', 'resume', etc.
//     onDeviceReady: function() {
//         this.receivedEvent('deviceready');
//     },
//
//     // Update DOM on a Received Event
//     receivedEvent: function(id) {
//         var parentElement = document.getElementById(id);
//         var listeningElement = parentElement.querySelector('.listening');
//         var receivedElement = parentElement.querySelector('.received');
//
//         listeningElement.setAttribute('style', 'display:none;');
//         receivedElement.setAttribute('style', 'display:block;');
//
//         console.log('Received Event: ' + id);
//     }
// };
//
// app.initialize();

document.addEventListener('deviceready', function() {
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update,
        extend: {
            makePlayer: makePlayer
        }
    }
};

var game = new Phaser.Game(config);
var player;
var leftKey;
var rightKey;

function preload() {
    this.load.image('player', 'assets/player.png');
    WebSocketTest();
}

function create() {
    player = this.makePlayer(this.sys.canvas.width / 2, this.sys.canvas.height);
    leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
}

function update() {
    if (rightKey.isDown && player.x < this.sys.canvas.width - (player.displayWidth / 2)){
        player.x += player.props.speed;
    } else if (leftKey.isDown && player.x > 0 + (player.displayWidth / 2)){
        player.x -= player.props.speed;
    }
    // if (player.x ==this.sys.canvas.width - (player.displayWidth)){
    //     $.ajax({
    //         type: 'GET',
    //         dataType: 'json',
    //         url: 'http://127.0.0.1:8000/player/profile-cache/',
    //         success: function (data) {
    //             console.log("here");
    //             console.log(data["success"]);
    //         },
    //         error: function (xhr) {
    //             console.log("error");
    //             window.alert(JSON.stringify(xhr));
    //             window.location.replace('/index.html');
    //         }
    //     });
    // }
    // WebSocketTest()
}

function WebSocketTest() {
    if ("WebSocket" in window) {
        // alert("WebSocket is supported by your Browser!");
        var ws = new WebSocket("wss://www.hitrr.com/ws/sockets/lobb/testing");
        ws.onopen = function onopen(event)
        {
            // Web Socket is connected, send data using send()
            ws.send("Test Message sent");
            // alert("Test Message away, away ... Captain!");
        };
        ws.onmessage = function onmessage(event)
        {
            var received_msg = event.data;
            console.log(received_msg);
            // alert("Incoming Messages ... brace for impact, Captain!");
        };
        ws.onclose = function onclose()
        {
            // websocket is closed.
            alert("Connection is closed...");
        };
        //============================
        // End of WebSocket Protocol
        //============================
    } else {
        // The browser doesn't support WebSocket
        alert("WebSocket NOT supported by your Browser!");
    }
}

function makePlayer(x,y) {
    var player = this.add.image(x,y,'player').setOrigin(0.5,1);
    player.props = {};
    player.props.speed = 15;
    return player
}
});