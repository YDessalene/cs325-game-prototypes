<!doctype html>
<html>
    <head>
        <meta charset="UTF-8" />
        <title>Pixel Fighter</title>
        <script src="phaser.js"></script>
    </head>
    <body>

    <script type="text/javascript">

var width = (window.innerWidth * window.devicePixelRatio);
var height = (window.innerHeight * window.devicePixelRatio);
var game = new Phaser.Game(1520, 705, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload () {
    game.load.image('stage','Assets/Backgrounds/stage.png');
    game.load.image('ground','Assets/Backgrounds/platform.png');
    game.load.spritesheet('player','Assets/Characters/player.png', 50, 37, 109);
    game.load.spritesheet('bandit','Assets/Characters/Bandit.png', 48, 48, 39);
    game.load.audio('pokemon','Assets/Sound/pokemon.mp3');
}

var player;
var enemy;

var attackTimer;
var takeDamageTimer;
var gameTimer;

var scoreText;
var lifeText;
var timeText;
var enemyLifeText;
function create () {
    var sound = game.add.audio('pokemon');
    attackTimer = game.time.create(false);
    attackTimer.loop(1000, canAttackAgain, this);

    takeDamageTimer = game.time.create(false);
    takeDamageTimer.loop(2000, enemyCanAttackAgain, this);

    gameTimer = game.time.create(false);
    gameTimer.loop(30000, resetGame, this);

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = 0xffffff;
    stage = game.add.sprite(150,10,'stage');

    createPlatforms();

    player = game.add.sprite(500, 268, 'player');
    player.scale.setTo(1.5,1.5);
    game.physics.arcade.enable(player);
    //player.body.collideWorldBounds = true;
    player.body.gravity.y = 900;
    player.anchor.setTo(.5,.5);

    player.animations.add('idle', [0,1,2,3], 10, true);
    player.animations.add('right', [8,9,10,11,12,13], 10, true);
    player.animations.add('jump', [16,17,18,19,20,21,22,23], 10, false);
    //player.animations.add('slide', [24,25,26,27,28], 10, false);
    player.animations.add('attack', [42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58], 20, true);

    enemy = game.add.sprite(920, 268, 'bandit');
    game.physics.arcade.enable(enemy);
    enemy.scale.setTo(1.5,1.5);
    enemy.body.gravity.y = 900;
    enemy.anchor.setTo(.5,.5);

    enemy.animations.add('idle', [4,5,6,7], 10, true);
    enemy.animations.add('left', [8,9,10,11,12,13,14,15], 10, true);
    enemy.animations.add('attack', [16,17,18,19,20,21,22,23], 15, true);
    enemy.animations.add('hit', [32,33,0], 7, false);

    scoreText = game.add.text(10, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
    lifeText = game.add.text(10, 48, 'Life: 3', { fontSize: '32px', fill: '#000' });
    timeText = game.add.text(10, 80, 'Time: 30', { fontSize: '32px', fill: '#000' });
    enemyLifeText = game.add.text(10, 112, 'Enemy: 1', { fontSize: '32px', fill: '#000' });

    addKeys();
}

var midJump = false;
var attack = false;
var enemyAttack = false;
var enemyLife = 1;
var life = 3;
var score = 0;

function update() {
    gameTimer.start();
    var hitPlatform = game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(enemy, platforms);
    player.body.velocity.x = 0;
    enemy.body.velocity.x = 0;

    if(game.physics.arcade.collide(player, bounds) || life == 0 || gameTimer.duration.toFixed(0) == 0)
        resetGame();

    if(player.body.touching.down && hitPlatform)
        midJump = false;

     /*     KEYBINDS START    */
    if (left.isDown)
    {
        if(player.scale.x > 0)
            player.scale.x *= -1;

        player.body.velocity.x = -200;

        if(midJump)
            player.animations.play('jump');
        else if(space.isDown)
            player.body.velocity.x = 0;
        else
            player.animations.play('right');
    }
    else if (right.isDown)
    {
        if(player.scale.x < 0)
            player.scale.x *= -1;

        player.body.velocity.x = 200;

        if(midJump)
            player.animations.play('jump');
        else if(space.isDown)
            player.body.velocity.x = 0;
        else
            player.animations.play('right');
    }
    else if (!space.isDown && !midJump)
        player.animations.play('idle');
    
    if (up.isDown && !midJump)
    {
        player.body.velocity.y = -500;
        player.animations.play('jump');
        midJump = true;
    }

    if (space.isDown && !midJump)
    {
        attack = true;
        player.animations.play('attack');
    }
    else
        attack = false;

    /*     KEYBINDS END    */

    /*     ENEMY MOVEMENT AND ATTACK     */
    if(Math.abs(enemy.position.x - player.position.x) > 35 && (enemy.position.x > 390 && enemy.position.x < 1110))
    {
        if(enemy.position.x > player.position.x)
        {
            if(enemy.scale.x < 0)
                enemy.scale.x *= -1;

            enemy.body.velocity.x = -100;
            enemy.animations.play('left');
        }
        else if(enemy.position.x < player.position.x)
        {
            if(enemy.scale.x > 0)
                enemy.scale.x *= -1;

            enemy.body.velocity.x = 100;
            enemy.animations.play('left');
        }
    }
    else if(Math.abs(enemy.position.x - player.position.x) <= 35 && Math.abs(enemy.position.y - player.position.y) < 20)
    {
            enemy.animations.play('attack');
            enemyAttack = true;
            takeDamageTimer.start();
    }
    else
    {
        enemy.animations.play('idle');
        enemyAttack = false;
    }
    /*     ENEMY MOVEMENT AND ATTACK END     */


    /*     TAKING DAMAGE     */
    //player attack
    if(attack && canAttack && (Math.abs(enemy.position.x - player.position.x) <= 35 && Math.abs(enemy.position.y - player.position.y) < 20))
    {
        enemyLife--;
        canAttack = false;
        gameTimer.destroy();
        resetTime();
        attackTimer.start();
        if(enemyLife == 0)
        {
            score++;
            enemyLife = score + 1;

            enemy.position.x = 920;
            enemy.position.y = 268;
        }
    }

    //enemy attack
    if(enemyAttack && enemyCanAttack && (Math.abs(enemy.position.x - player.position.x) <= 35 && Math.abs(enemy.position.y - player.position.y) < 20))
    {
        life--;
        enemyCanAttack = false;
        takeDamageTimer.start();
    }
    /*     TAKING DAMAGE END     */

    updateText();
}

function updateText()
{
    scoreText.text = 'Score: ' + score;
    lifeText.text = 'Life: ' + life;
    timeText.text = 'Time: ' + (gameTimer.duration.toFixed(0)/1000);
    enemyLifeText.text = 'Enemy: ' + enemyLife;
}

function resetTime()
{
    gameTimer = game.time.create(false);
    gameTimer.loop(30000, resetGame, this);
}

var canAttack = true;
function canAttackAgain()
{
    canAttack = true;
}

var enemyCanAttack = false;
function enemyCanAttackAgain()
{
    enemyCanAttack = true;
}

var up,left,right,space;
function addKeys()
{
    up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

function resetGame()
{
    resetTime();
    score = 0;
    life = 3;

    player.position.x = 500;
    player.position.y = 268;

    enemy.position.x = 920;
    enemy.position.y = 268;
}

var platforms;
var bounds;
function createPlatforms()
{
    platforms = game.add.group();
    platforms.enableBody = true;
    bounds = game.add.group();
    bounds.enableBody = true;

    var ground = platforms.create(420,325,'ground');
    ground.width = 660;
    ground.body.immovable = true;
    ground.visible = false;

    var ledge = platforms.create(500,218,'ground');
    ledge.body.immovable = true;
    ledge.height = 5; ledge.width = 115;
    ledge.visible = false;

    ledge = platforms.create(885,218,'ground');
    ledge.body.immovable = true;
    ledge.height = 5; ledge.width = 115;
    ledge.visible = false;

    ledge = platforms.create(695,108,'ground');
    ledge.body.immovable = true;
    ledge.height = 5; ledge.width = 115;
    ledge.visible = false;

    ledge = bounds.create(0,game.world.height-20,'ground');
    ledge.body.immovable = true;
    ledge.width = game.world.width;
    ledge.visible = false;
}

    </script>

    </body>
</html>