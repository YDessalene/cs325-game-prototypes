var thegame = function(game) {};
var up,left,right,w,a,d,numU,numL,numR,y,g,j;
var esc,c,r;
var player1,player2,player3,player4;
var posX,posY;
var platforms;
var start,startTime;
var timeText;
var midJump1,midJump2,midJump3,midJump3;
var hitplatform1,hitPlatform2,hitPlatform3,hitPlatform4;
var hit1,hit2,hit3,hit4;
var fireball, speed, spawnTime, levelTime, fireballTime;

thegame.prototype = {

	preload: function() {
		this.game.load.spritesheet('player', 'assets/Characters/player.png', 50, 37, 109);
		this.game.load.image('ground', 'assets/Map/platform.png');
		this.game.load.image('background', 'assets/Map/background1.png');
		this.game.load.image('fireball', 'assets/fireball.png');

		player1 = null;
		player2 = null;
		player3 = null;
		player4 = null;
		posX = 100;
		posY = 430;
		start = false;
		midJump1 = false;
		midJump2 = false;
		midJump3 = false;
		midJump4 = false;
		speed = 150;
		spawnTime = 5000;
	},

	create: function() {
		this.game.add.sprite(0,0,'background');
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.addKeys();
		esc.onDown.addOnce(this.end, this);

		startTime = this.game.time.create(false);
		startTime.loop(5000, this.canStart, this);

		levelTime = this.game.time.create(false);
		levelTime.loop(5000, this.faster, this);

		fireballTime = this.game.time.create(false);
		fireballTime.loop(spawnTime, this.spawnFireball, this);

		platforms = this.game.add.group();
		platforms.enableBody = true;

		var ground = platforms.create(0,470,'ground');
		ground.width = this.game.world.width;
		ground.body.immovable = true;
		ground.visible = false;
		
		timeText = this.game.add.text(300, 30, '5', { fontSize: '32px', fill: '#ffffff' });
		startTime.start();
		levelTime.start();
	},

	update: function() {
		if(player1 != null) {
			hitPlatform1 = this.game.physics.arcade.collide(player1, platforms);
			this.game.physics.arcade.overlap(player1, fireball, this.remove1, null, this);
		}
		if(player2 != null) {
			hitPlatform2 = this.game.physics.arcade.collide(player2, platforms);
			this.game.physics.arcade.overlap(player2, fireball, this.remove2, null, this);
		}
		if(player3 != null) {
			hitPlatform3 = this.game.physics.arcade.collide(player3, platforms);
			this.game.physics.arcade.overlap(player3, fireball, this.remove3, null, this);
		}
		if(player4 != null) {
			hitPlatform4 = this.game.physics.arcade.collide(player4, platforms);
			this.game.physics.arcade.overlap(player4, fireball, this.remove4, null, this);
		}

		if(!start) {
			c.onDown.addOnce(this.addPlayer, this);
			r.onDown.addOnce(this.removePlayer, this);
			this.updateText();
		}
		else {
			fireballTime.start();

			if(this.game.physics.arcade.collide(platforms, fireball))
				fireball.kill();

			if(player1 == null && player2 == null && player3 == null && player4 == null)
				this.end();

			if(hit1)
				player1 = null;
			if(hit2)
				player2 = null;
			if(hit3)
				player3 = null;
			if(hit4)
				player4 = null;

			if(player1 != null)
				this.player1Update();
			if(player2 != null)
				this.player2Update();
			if(player3 != null)
				this.player3Update();
			if(player4 != null)
				this.player4Update();
		}
	},

	faster: function() {
		speed+=25;
	},

	spawnFireball: function() {
		fireball = this.game.add.sprite(Math.floor(Math.random()*this.game.world.width), 0, 'fireball');
		this.game.physics.arcade.enable(fireball);
		fireball.scale.setTo(.75,.75);
		fireball.body.velocity.y = speed;
	},

	player1Update: function() {

		player1.body.velocity.x = 0;

		if(player1.body.touching.down && hitPlatform1)
        	midJump1 = false;

		if (left.isDown)
		{
			if(player1.scale.x > 0)
				player1.scale.x *= -1;

			player1.body.velocity.x = -200;

			if(midJump1)
				player1.animations.play('jump');
			else
				player1.animations.play('right');
		}
		else if (right.isDown)
		{
			if(player1.scale.x < 0)
				player1.scale.x *= -1;

			player1.body.velocity.x = 200;

			if(midJump1)
				player1.animations.play('jump');
			else
				player1.animations.play('right');
		}
		else if (!midJump1)
			player1.animations.play('idle');

		if (up.isDown && !midJump1)
		{
			player1.body.velocity.y = -500;
			player1.animations.play('jump');
			midJump1 = true;
		}
	},

	player2Update: function() {
		player2.body.velocity.x = 0;

		if(player2.body.touching.down && hitPlatform2)
        	midJump2 = false;

		if (a.isDown)
		{
			if(player2.scale.x > 0)
				player2.scale.x *= -1;

			player2.body.velocity.x = -200;

			if(midJump2)
				player2.animations.play('jump');
			else
				player2.animations.play('right');
		}
		else if (d.isDown)
		{
			if(player2.scale.x < 0)
				player2.scale.x *= -1;

			player2.body.velocity.x = 200;

			if(midJump2)
				player2.animations.play('jump');
			else
				player2.animations.play('right');
		}
		else if (!midJump2)
			player2.animations.play('idle');

		if (w.isDown && !midJump2)
		{
			player2.body.velocity.y = -500;
			player2.animations.play('jump');
			midJump2 = true;
		}
	},

	player3Update: function() {
		player3.body.velocity.x = 0;

		if(player3.body.touching.down && hitPlatform3)
        	midJump3 = false;

		if (g.isDown)
		{
			if(player3.scale.x > 0)
				player3.scale.x *= -1;

			player3.body.velocity.x = -200;

			if(midJump3)
				player3.animations.play('jump');
			else
				player3.animations.play('right');
		}
		else if (j.isDown)
		{
			if(player3.scale.x < 0)
				player3.scale.x *= -1;

			player3.body.velocity.x = 200;

			if(midJump3)
				player3.animations.play('jump');
			else
				player3.animations.play('right');
		}
		else if (!midJump3)
			player3.animations.play('idle');

		if (y.isDown && !midJump3)
		{
			player3.body.velocity.y = -500;
			player3.animations.play('jump');
			midJump3 = true;
		}
	},

	player4Update: function() {
		player4.body.velocity.x = 0;

		if(player4.body.touching.down && hitPlatform4)
        	midJump4 = false;

		if (numL.isDown)
		{
			if(player4.scale.x > 0)
				player4.scale.x *= -1;

			player4.body.velocity.x = -200;

			if(midJump4)
				player4.animations.play('jump');
			else
				player4.animations.play('right');
		}
		else if (numR.isDown)
		{
			if(player4.scale.x < 0)
				player4.scale.x *= -1;

			player4.body.velocity.x = 200;

			if(midJump4)
				player4.animations.play('jump');
			else
				player4.animations.play('right');
		}
		else if (!midJump4)
			player4.animations.play('idle');

		if (numU.isDown && !midJump4)
		{
			player4.body.velocity.y = -500;
			player4.animations.play('jump');
			midJump4 = true;
		}
	},

	remove1: function() {
		player1.kill();
		player1 = null;
	},

	remove2: function() {
		player2.kill();
		player2 = null;
	},

	remove3: function() {
		player3.kill();
		player3 = null;
	},

	remove4: function() {
		player4.kill();
		player4 = null;
	},

	canStart: function() {
		start = true;
		timeText.kill();
		startTime.stop();
		c.reset();
		r.reset();
	},

	addPlayer: function() {
		if(player1 == null) {
			player1 = this.game.add.sprite(posX, posY, 'player');
			player1.scale.setTo(1.5,1.5);
			this.game.physics.arcade.enable(player1);
		    player1.body.collideWorldBounds = true;
		    player1.body.gravity.y = 900;
		    player1.anchor.setTo(.5,.5);


		    player1.animations.add('idle', [0,1,2,3], 10, true);
		    player1.animations.add('right', [8,9,10,11,12,13], 10, true);
		    player1.animations.add('jump', [16,17,18,19,20,21,22,23], 10, false);

		    posX+=50;
		}
		else if(player2 == null) {
			player2 = this.game.add.sprite(posX, posY, 'player');
			player2.scale.setTo(1.5,1.5);
			this.game.physics.arcade.enable(player2);
		    player2.body.collideWorldBounds = true;
		    player2.body.gravity.y = 900;
		    player2.anchor.setTo(.5,.5);

		    player2.animations.add('idle', [0,1,2,3], 10, true);
		    player2.animations.add('right', [8,9,10,11,12,13], 10, true);
		    player2.animations.add('jump', [16,17,18,19,20,21,22,23], 10, false);

		    posX+=50;
		}
		else if(player3 == null) {
			player3 = this.game.add.sprite(posX, posY, 'player');
			player3.scale.setTo(1.5,1.5);
			this.game.physics.arcade.enable(player3);
		    player3.body.collideWorldBounds = true;
		    player3.body.gravity.y = 900;
		    player3.anchor.setTo(.5,.5);

		    player3.animations.add('idle', [0,1,2,3], 10, true);
		    player3.animations.add('right', [8,9,10,11,12,13], 10, true);
		    player3.animations.add('jump', [16,17,18,19,20,21,22,23], 10, false);

		    posX+=50;
		}
		else if(player4 == null) {
			player4 = this.game.add.sprite(posX, posY, 'player');
			player4.scale.setTo(1.5,1.5);
			this.game.physics.arcade.enable(player4);
		    player4.body.collideWorldBounds = true;
		    player4.body.gravity.y = 900;
		    player4.anchor.setTo(.5,.5);

		    player4.animations.add('idle', [0,1,2,3], 10, true);
		    player4.animations.add('right', [8,9,10,11,12,13], 10, true);
		    player4.animations.add('jump', [16,17,18,19,20,21,22,23], 10, false);

		    posX+=50;
		}
	},

	removePlayer: function() {
		if(player4 != null) {
			posX-=50;
			player4.kill();
			player4 = null;
		}
		else if(player3 != null) {
			posX-=50;
			player3.kill();
			player3 = null;
		}
		else if(player2 != null) {
			posX-=50;
			player2.kill();
			player2 = null;
		}
		else if(player1 != null) {
			posX-=50;
			player1.kill();
			player1 = null;
		}
	},

	addKeys: function() {
		up = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
		left = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		right = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		w = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
		a = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
		d = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
		numU = this.game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_8);
		numL = this.game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_4);
		numR = this.game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_6);
		y = this.game.input.keyboard.addKey(Phaser.Keyboard.Y);
		g = this.game.input.keyboard.addKey(Phaser.Keyboard.G);
		j = this.game.input.keyboard.addKey(Phaser.Keyboard.J);

		esc = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
		c = this.game.input.keyboard.addKey(Phaser.Keyboard.C);
		r = this.game.input.keyboard.addKey(Phaser.Keyboard.R);
	},

	updateText: function() {
		timeText.text = 'Time: ' + (startTime.duration.toFixed(0)/1000);
	},

	end: function() {
		this.game.state.start("GameOver");
	}
}