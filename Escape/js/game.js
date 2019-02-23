var startGame = function(game) {};
var player;
var enemy1,enemy2,enemy3;
var pFaceNorth,pFaceSouth,pFaceEast,pFaceWest = false;
var e1FaceSouth,e2FaceSouth,e3FaceSouth = true;
var platforms;
var finishLine, finish;
var music;

startGame.prototype = {
	preload: function() {
		this.game.load.spritesheet('player','assets/Characters/topdown2.png', 48, 50, 48);
		this.game.load.image('classroom', 'assets/Background/classroom.png');
		this.game.load.image('wall', 'assets/Background/platform.png');
		this.game.load.audio('music', 'assets/Audio/pokemon.mp3');
	},

	create: function() {
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		this.game.add.sprite(0,0,'classroom');

		music = this.game.add.audio('music');
		music.play();

		player = this.game.add.sprite(100, 500, 'player');
		this.game.physics.arcade.enable(player);
		player.frame = 1;

		player.animations.add('down', [0,1,2], 10, true);
		player.animations.add('left', [12,13,14], 10, true);
	    player.animations.add('right', [24,25,26], 10, true);
	    player.animations.add('up', [36,37,38], 10, true);

	    enemy1 = this.game.add.sprite(290, 320, 'player');
	    this.game.physics.arcade.enable(enemy1);
	    enemy1.frame = 4;

	    enemy1.animations.add('down', [3,4,5], 10, true);
	    enemy1.animations.add('up', [39,40,41], 10, true);

	    enemy2 = this.game.add.sprite(430, 320, 'player');
	    this.game.physics.arcade.enable(enemy2);
	    enemy2.frame = 7;
	    
	    enemy2.animations.add('down', [6,7,8], 10, true);
	    enemy2.animations.add('up', [42,43,44], 10, true);

	    enemy3 = this.game.add.sprite(575, 320, 'player');
	    this.game.physics.arcade.enable(enemy3);
	    enemy3.frame = 10;
	    
	    enemy3.animations.add('down', [9,10,11], 10, true);
	    enemy3.animations.add('up', [45,46,47], 10, true);

	    platforms = this.game.add.group();
    	platforms.enableBody = true;

    	finishLine = this.game.add.group();
    	finishLine.enableBody = true;

    	var wall = platforms.create(48, 290, 'wall');
    	wall.width = 820;
    	wall.body.immovable = true;
    	wall.visible = false;

    	var wall = platforms.create(0, 0, 'wall');
    	wall.width = 930; wall.height = 45;
    	wall.body.immovable = true;
    	wall.visible = false;

    	var wall = platforms.create(0, 0, 'wall');
    	wall.width = 45; wall.height = 800;
    	wall.body.immovable = true;
    	wall.visible = false;

    	var wall = platforms.create(0, this.game.world.height-45, 'wall');
    	wall.width = 913; wall.height = 45;
    	wall.body.immovable = true;
    	wall.visible = false;

    	var wall = platforms.create(this.game.world.width-45, 0, 'wall');
    	wall.width = 45; wall.height = 600;
    	wall.body.immovable = true;
    	wall.visible = false;

    	var wall = finishLine.create(this.game.world.width-10, this.game.world.height-145, 'wall');
    	wall.width = 10; wall.height = 100;
    	wall.body.immovable = true;
    	wall.visible = false;
	},

	update: function() {
		this.game.physics.arcade.collide(player, platforms);

		if(this.game.physics.arcade.collide(player, finishLine)) 
			this.winGame();

		this.movePlayer();
		this.moveEnemy1();
		this.moveEnemy2();
		this.moveEnemy3();

		if(e1FaceSouth && (player.position.y > enemy1.position.y) && Math.abs(player.position.x - enemy1.position.x) < 40)
			this.loseGame();
		else if(!e1FaceSouth && (player.position.y < enemy1.position.y) && Math.abs(player.position.x - enemy1.position.x) < 40)
			this.loseGame();

		if(e2FaceSouth && (player.position.y > enemy2.position.y) && Math.abs(player.position.x - enemy2.position.x) < 40)
			this.loseGame();
		else if(!e2FaceSouth && (player.position.y < enemy2.position.y) && Math.abs(player.position.x - enemy2.position.x) < 40)
			this.loseGame();

		if(e3FaceSouth && (player.position.y > enemy3.position.y) && Math.abs(player.position.x - enemy3.position.x) < 40)
			this.loseGame();
		else if(!e3FaceSouth && (player.position.y < enemy3.position.y) && Math.abs(player.position.x - enemy3.position.x) < 40)
			this.loseGame();
	},

	moveEnemy1: function() {
		if(this.game.physics.arcade.collide(enemy1, platforms)) {
			if(e1FaceSouth) 
				e1FaceSouth = false;
			else 
				e1FaceSouth = true;			
		}

		if(e1FaceSouth) {
			enemy1.body.velocity.y = 100;
			enemy1.animations.play('down');
		}
		else {
			enemy1.body.velocity.y = -100;
			enemy1.animations.play('up');
		}
	},

	moveEnemy2: function() {
		if(this.game.physics.arcade.collide(enemy2, platforms)) {
			if(e2FaceSouth) 
				e2FaceSouth = false;
			else 
				e2FaceSouth = true;			
		}

		if(e2FaceSouth) {
			enemy2.body.velocity.y = 150;
			enemy2.animations.play('down');
		}
		else {
			enemy2.body.velocity.y = -150;
			enemy2.animations.play('up');
		}
	},

	moveEnemy3: function() {
		if(this.game.physics.arcade.collide(enemy3, platforms)) {
			if(e3FaceSouth) 
				e3FaceSouth = false;
			else 
				e3FaceSouth = true;			
		}

		if(e3FaceSouth) {
			enemy3.body.velocity.y = 200;
			enemy3.animations.play('down');
		}
		else {
			enemy3.body.velocity.y = -200;
			enemy3.animations.play('up');
		}
	},

	movePlayer: function() {
		player.body.velocity.x = 0;
		player.body.velocity.y = 0;

		if(this.game.input.keyboard.addKey(Phaser.Keyboard.W).isDown) {
			player.body.velocity.y = -150;
			player.animations.play('up');

			pFaceNorth = true;
			pFaceSouth = false;
			pFaceWest = false;
			pFaceEast = false;
		}
		else if(this.game.input.keyboard.addKey(Phaser.Keyboard.S).isDown) {
			player.body.velocity.y = 150;
			player.animations.play('down');

			pFaceNorth = false;
			pFaceSouth = true;
			pFaceWest = false;
			pFaceEast = false;
		}
		else if(this.game.input.keyboard.addKey(Phaser.Keyboard.D).isDown) {
			player.body.velocity.x = 150;
			player.animations.play('right');

			pFaceNorth = false;
			pFaceSouth = false;
			pFaceWest = false;
			pFaceEast = true;
		}
		else if(this.game.input.keyboard.addKey(Phaser.Keyboard.A).isDown) {
			player.body.velocity.x = -150;
			player.animations.play('left');

			pFaceNorth = false;
			pFaceSouth = false;
			pFaceWest = true;
			pFaceEast = false;
		}
		else {
			if(pFaceNorth)
				player.frame = 37;
			if(pFaceEast)
				player.frame = 25;
			if(pFaceSouth)
				player.frame = 1;
			if(pFaceWest)
				player.frame = 13;
		}
	},

	winGame: function() {
		this.game.state.start("Win");
	},

	loseGame: function() {
		this.game.state.start("GameOver");
	}
}