enchant();
window.onload = function() {
    var game = new Game();
    game.preload("chara1.png", "icon0.png");
    game.onload = function() {
        // （自機）茶くま
        var player = new Sprite(32, 32);
        player.image = game.assets["chara1.png"];
        player.frame = 0;
        player.x = 144;
        player.y = 288;
        game.rootScene.addChild(player);

        // （敵機）白くま
        var enemy = new Sprite(32, 32);
        enemy.image = game.assets["chara1.png"];
        enemy.frame = 5;
        enemy.x = 144;
        enemy.y = 0;
        game.rootScene.addChild(enemy);

        // BulletML
        var bulletml = "<bulletml>"
                + "<action label='top'>"
                + "<fire><direction>-20</direction><bullet/></fire>"
                + "<repeat>"
                + "<times>4</times>"
                + "<action>"
                + "<fire><direction type='sequence'>10</direction><bullet/></fire>"
                + "</action>" + "</repeat>" + "</action>" + "</bulletml>";
        // 攻撃パターンオブジェクト
        var pattern = new AttackPattern(BulletML.build(bulletml));
        // enterframeイベントリスナを生成
        var ticker = pattern.createTicker({
            target : player,
            bulletFactory : function() {
                var bullet = new Sprite(16, 16);
                bullet.image = game.assets["icon0.png"];
                bullet.frame = 10;
                return bullet;
            }
        });
        // 生成したイベントリスナを敵機に登録
        enemy.addEventListener("enterframe", ticker);
    };
    game.start();
};
