Template['flappy-square'].rendered = function () {

	var flappyContainer = document.getElementById("flappy-container");

	var app = new PLAYGROUND.Application({

		container: flappyContainer,
		height: window.innerHeight * 0.7,
		// scale: 1,

		create: function () {

			var that = this;

			this.paused = true;

			this.defaultFlappy = {
				x: 75,
				y: that.height / 2,
				width: 75,
				height: 75,
				jumpHeight: 75,
				jumpSpeed: 100,
				fallSpeed: 200,
				timeSinceJump: 0,
				fallAcceleration: 4,
			};

			this.flappy = this.defaultFlappy;

			this.cols = [];
			this.timeSinceCol = 0;
			this.colNum = 3;
			this.colNumOffset = 4;
			this.colGap = 300;
			this.colSpeed = 4;

			this.resetFlappy = function () {
				that.paused = true;
				that.flappy.y = that.width / 2;
				that.flappy.timeSinceJump = 0;
				that.cols = [];
				that.timeSinceCol = 0;
				that.colNum = 3;
				that.colNumOffset = 4;
				that.colGap = 300;
				that.colSpeed = 4;

				// that.layer
				// 	.clear('#333')
				// 	.font('32px Helvetica')
				// 	.fillStyle('whitesmoke')
				// 	.fillText('Game over. Jump again to restart', that.center.x, that.center.y);
			};

			this.jumpFlappy = function () {

				that.paused = false;

				for (var i = that.flappy.jumpHeight - 1; i >= 0; i--) {

					setTimeout( function () {
						that.flappy.y -= 1;
					}, that.ease(i/that.flappy.jumpHeight, 'linear') * that.flappy.jumpSpeed );
				}

				that.flappy.timeSinceJump = 0;

			};
		},

		ready: function () {

		},

		step: function (dt) {

			var that = this;

			// Move flappy
			this.flappy.timeSinceJump += dt;

			if (!this.paused) this.flappy.y += (this.flappy.fallSpeed * dt) * (this.flappy.timeSinceJump * this.flappy.fallAcceleration);

			// Move cols
			if (!this.paused) {
				this.cols.forEach( function (col) {
					col.x -= col.moveSpeed;
				});
			}

			// Generate cols
			this.timeSinceCol += dt;

			if( this.timeSinceCol > 2) {
				this.cols.push( {
					gap: that.colGap,
					x: that.width,
					width: that.width / (that.colNum * that.colNumOffset),
					heightRatio: Math.random(),
					moveSpeed: that.colSpeed,
				});
				this.timeSinceCol = 0;
			}


			// Hit ground
			if (this.flappy.y > this.height) {
				// change state to 'lost'
				that.resetFlappy();
			}

			function areTouching(flappy, cols) {
				return cols.some( function (col) {
					if ( ( col.x < flappy.x && flappy.x < (col.x + col.width)) &&
					( flappy.y < col.y1 || flappy.y > (col.y1 + col.gap) ) ) {
						return true;
					}
				});
			}

			// Collision detection
			if ( areTouching(this.flappy, this.cols) ) {
				// change state to 'lost'
				that.resetFlappy();
			}
		},

		render: function (dt) {

			var that = this;

			this.layer.clear('#333');

			this.layer.fillStyle('whitesmoke');
			this.layer.fillRect(this.flappy.x, this.flappy.y, this.flappy.width, this.flappy.height);

			this.cols.forEach( function (col) {
				that.layer.fillStyle('#545454');

				var height1 = (that.height - col.gap ) * col.heightRatio;
				var height2 = that.height - height1 - col.gap;
				var yOffset = height1 + col.gap;

				col.y1 = height1;
				col.y2 = height2;

				that.layer.fillRect(col.x, 0, col.width, height1); // first column
				that.layer.fillRect(col.x, yOffset, col.width, height2); // second column
			});

			// this.layer.drawImage(this.images.bgimage, 0,0); // Background
			// this.layer.drawImage(this.images.flappy, this.flappy.x, this.flappy.y);

		},

		mousedown: function (data) {

			this.jumpFlappy();
		},

		keydown: function (event) {

			if (event.key === 'space') {

				this.jumpFlappy();

			}
		}
	});
};