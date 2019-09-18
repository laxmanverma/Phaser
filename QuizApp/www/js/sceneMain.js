class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }

    preload() {}
    create() {
        this.formUtil = new FormUtil({
            scene: this,
            rows: 11,
            cols: 11
        });
       // this.formUtil.showNumbers();
        document.getElementById("login").style.display="block";
        this.formUtil.scaleToGameW("username", .5);
        this.formUtil.scaleToGameH("username", .07);
        this.formUtil.placeElementAt(16, 'username', true);
        this.formUtil.scaleToGameW("password", .5);
        this.formUtil.scaleToGameH("password", .07);
        this.formUtil.placeElementAt(38, 'password', true);
        this.formUtil.scaleToGameW("btnSend", .25);
        this.formUtil.placeElementAt(60, "btnSend", true);
        this.formUtil.addClickCallback("btnSend", this.sendForm, this);
    }

    sendForm() {
        console.log("sendForm");
        var username = this.formUtil.getTextAreaValue("username");
        var password = this.formUtil.getTextAreaValue("password");
        var player_id, username;
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: 'http://127.0.0.1:8001/player/login/',
            data: JSON.stringify({"email": "krmayank911@gmail.com", "password": "1234567"}),
            success: function (data) {
                console.log(data);
                player_id = data["data"]["player_id"];
                username = data["data"]["username"];
                document.getElementById("login").style.display="none";
                game.scene.start('Lobby',{player_id:player_id, username:username});
            },
            error: function (xhr) {
                console.log("error");
                console.log(JSON.stringify(xhr));
                // window.alert(JSON.stringify(xhr));
            }
        });
    }
    update() {}
}