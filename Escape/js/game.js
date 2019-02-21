var startGame = function(game) {};
var player;
var pFaceEast,pFaceWest,pFaceSouth,pFaceNorth = false;
var platforms;

startGame.prototype = {
	preload: function() {
		this.game.load.spritesheet('player','assets/Characters/topdown2.png', 48, 50, 48);
		this.game.load.image('classroom', 'assets/Background/classroom.png');
		this.game.load.image('wall', 'assets/Background/platform.png');
	},

	create: function() {
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		this.game.add.sprite(0,0,'classroom');

		player = this.game.add.sprite(100, 500, 'player');
		this.game.physics.arcade.enable(player);
		player.body.collideWorldBounds = true;
		player.frame = 1;

		player.animations.add('down', [0,1,2], 10, true);
		player.animations.add('left', [12,13,14], 10, true);
	    player.animations.add('right', [24,25,26], 10, true);
	    player.animations.add('up', [36,37,38], 10, true);

	    platforms = this.game.add.group();
    	platforms.enableBody = true;

    	var wall = platforms.create(48, 300, 'wall');
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

    	var wall = platforms.create(0, 800, 'wall');
    	wall.body.immovable = true;
	},

	update: function() {
		this.game.physics.arcade.collide(player, platforms);

		player.body.velocity.x = 0;
		player.body.velocity.y = 0;

		if(this.game.input.keyboard.addKey(Phaser.Keyboard.W).isDown) {
			player.body.velocity.y = -100;
			player.animations.play('up');

			pFaceNorth = true;
			pFaceSouth = false;
			pFaceWest = false;
			pFaceEast = false;
		}
		else if(this.game.input.keyboard.addKey(Phaser.Keyboard.S).isDown) {
			player.body.velocity.y = 100;
			player.animations.play('down');

			pFaceNorth = false;
			pFaceSouth = true;
			pFaceWest = false;
			pFaceEast = false;
		}
		else if(this.game.input.keyboard.addKey(Phaser.Keyboard.D).isDown) {
			player.body.velocity.x = 100;
			player.animations.play('right');

			pFaceNorth = false;
			pFaceSouth = false;
			pFaceWest = false;
			pFaceEast = true;
		}
		else if(this.game.input.keyboard.addKey(Phaser.Keyboard.A).isDown) {
			player.body.velocity.x = -100;
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
	}	
}