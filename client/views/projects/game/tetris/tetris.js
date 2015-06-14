Template.tetris.rendered = function () {

	var container = document.getElementById("tetris-container");

	var app = new PLAYGROUND.Application({

		container: container,
		height: window.innerHeight * 0.7,
		width: window.innerWidth,

		create: function () {

			var that = this;

			////////////////////////////////////
			//	Game settings 				  //
			////////////////////////////////////

			this.settings = {
				padding: {
					format: 'percent',
					value: 0.1, // top, bottom TODO: make them seperate
				},
				fillStyle: {
					blank: 'whitesmoke',
					filled: '#E5837C',
				},
				gameSpeed: 1,// in seconds
			};
			this.timeSinceMoved = 0;

			////////////////////////////////////////////////////////////////////////
			////////////////////	Construct level properties 	////////////////////
			////////////////////////////////////////////////////////////////////////

			this.level = {
				horizontal: 10,
				vertical: 24,
				hidden: 4,
				enum: {
					HIDDEN: 0,
					BLANK: 1,
					FILLED: 2,
					WHITESPACE: 3, // the empty area of the 4x4 of the tetris block - ignore it in collision detection
				},
				levelMap: null, // LEVEL ARRAY IS Y,X INSTEAD OF X,Y FOR SIMPLICITY (OOPS)
				cellSpacingRatio: 0.1,
				// more added below
			};

			////////////////////////////////////
			//	Calculate cell properties     //
			////////////////////////////////////
			var width = that.width;
			var height = that.height;

			var padding = that.settings.padding.value * height;

			var levelHeight = height - padding;

			var cellHeight = levelHeight / that.level.vertical;
			var cellWidth = cellHeight;

			this.level.cellWidth = cellHeight;
			this.level.cellHeight = cellWidth;
			this.level.cellSpacing = cellHeight * this.level.cellSpacingRatio;

			this.level.totalCellWidth = this.level.cellWidth + this.level.cellSpacing;
			this.level.totalCellHeight = this.level.cellHeight + this.level.cellSpacing;

			this.level.sidePadding = width - ( this.level.totalCellWidth * this.level.horizontal );// left + right

			this.level.startingX = 0 + ( this.level.sidePadding / 2 );
			// point at which level rendering starts horizontally
			this.level.startingY = 0 - ( this.level.hidden * (this.level.cellHeight + this.level.cellSpacing) );
			// point at which level rendering starts vertically, makes it so that the topmost blocks are hidden

			////////////////////////////////////
			//	Generate a blank level 	      //
			////////////////////////////////////
			this.level.generateBlankLevel = function (width, height, blankVal) {

				// elegant solution didn't work because arrays were somehow linked

				var levelArr = [];

				for (var i = 0; i < height; i++) {
					levelArr[i] = [];

					for( var j = 0; j < width; j++ ) {
						levelArr[i].push(blankVal);
					}
				}

				that.level.levelMap = levelArr; // use 'that' because otherwise is in function scope
			};

			this.level.generateBlankLevel(this.level.horizontal, this.level.vertical, this.level.enum.BLANK);

			////////////////////////////////////////////////////////////////////////
			////////////////////		Render level 			////////////////////
			////////////////////////////////////////////////////////////////////////

			this.level.renderLevel = function () {
				var level = that.level.levelMap;

				var cellWidth = that.level.cellWidth;
				var cellHeight = that.level.cellHeight;
				var cellSpacing = that.level.cellSpacing;

				var totalCellHeight = that.level.totalCellHeight;
				var totalCellWidth = that.level.totalCellWidth;

				var startingX = that.level.startingX;
				var startingY = that.level.startingY;

				var x = startingX;
				var y = startingY;
				var w = cellWidth;
				var h = cellHeight;

				var blank = that.level.enum.BLANK;
				var filled = that.level.enum.FILLED;

				var blankColor = that.settings.fillStyle.blank;
				var fillColor = that.settings.fillStyle.filled;

				var currCell;
				level.forEach( function (row, arrY, levelArr) {

					y += totalCellHeight;

					row.forEach( function (cell, arrX, rowArr) {

						if ( cell === blank) {
							that.layer.fillStyle(blankColor);
						}
						if ( cell === filled) {
							that.layer.fillStyle(fillColor);
						}

						that.layer.fillRect(x,y,w,h);

						x += totalCellHeight;
					});

					x = startingX; // reset the starting point

				});

			};
			////////////////////////////////////////////////////////////////////////
			////////////////////////////////////////////////////////////////////////
			// End level render

			////////////////////////////////////////////////////////////////////////
			////////////////////		Render level 			////////////////////
			////////////////////////////////////////////////////////////////////////

			this.level.reDrawLevel = function () {

				// var level = that.level.levelMap;

				that.level.generateBlankLevel(that.level.horizontal, that.level.vertical, that.level.enum.BLANK);
				// draw from scratch

				var level = that.level.levelMap;

				var blank = that.level.enum.BLANK;
				var filled = that.level.enum.FILLED;
				var whitespace = that.level.enum.WHITESPACE;

				var drawSunkenShapes = function () {

				};

				var drawCurrentShape = function () {
					var currentShape = that.shape.currentShape;

					var startingX = currentShape.x;
					var startingY = currentShape.y;
					var endingX = currentShape.x + currentShape.width;
					var endingY = currentShape.y + currentShape.height;

					console.log(startingX, endingX, startingY, endingY);

					var diffY, diffX;
					for ( var i = startingY; i < endingY; i++) {

						diffY = endingY - i - 1;
						for ( var j = startingX; j < endingX; j++) {

							diffX = endingX - j - 1;
							if (currentShape.structure[diffY][diffX] === blank) {
								level[i][j] = whitespace;
							}
							if (currentShape.structure[diffY][diffX] === filled) {
								level[i][j] = filled;
							}
							// console.log(diffY, diffX);

							// level[i][j] = filled;
						}
					}

					// console.log(level[0]);
					// level[startingY][4] = filled;

				};
				drawCurrentShape();

			};

			////////////////////////////////////////////////////////////////////////
			////////////////////	Check for matches	 		////////////////////
			////////////////////////////////////////////////////////////////////////

			this.level.checkRows = function () {

			};

			////////////////////////////////////////////////////////////////////////
			////////////////////////////////////////////////////////////////////////
			// End collision check

			////////////////////////////////////////////////////////////////////////
			////////////////////////////////////////////////////////////////////////
			// End level properties




			////////////////////////////////////////////////////////////////////////
			////////////////////	Construct Shape Properties 	////////////////////
			////////////////////////////////////////////////////////////////////////

			this.shape = {
				shapeTypes: null,
				currentShape: null,
				addShape: null,
				moveDown: null,
				sunkShapes: null,
				rotateShape: null,
			};

			////////////////////////////////////
			//	Add shapes		 	   		  //
			////////////////////////////////////

			this.shape.addShape = function () {

				var randInt = function (min, max) { // Random int between two ints
					return Math.floor(Math.random() * (max - min + 1)) + min;
				};

				var shapeTypes = that.shape.shapeTypes;

				var shapeTypeNum = randInt(0, shapeTypes.length - 1);

				var currentShape = shapeTypes[shapeTypeNum];

				currentShape = _.extend(currentShape, {
					x: randInt(0, that.level.horizontal - currentShape.width - 1),
					y: 0,
				});

				that.shape.currentShape = currentShape;
			};

			////////////////////////////////////
			//	Move shape down		 	   	  //
			////////////////////////////////////

			this.shape.moveDown = function () {
				that.shape.currentShape.y += 1;
			};

			////////////////////////////////////
			//	Define shapes		 	      //
			////////////////////////////////////
			var b = this.level.enum.BLANK;
			var f = this.level.enum.FILLED;
			this.shape.shapeTypes = [
				{
					width: 4,
					height: 4,
					lowestPoint: 4,
					highestPoint: 4,
					structure: [
						[b,b,b,b],  // O O O O
						[b,b,b,b],  // O O O O
						[b,b,b,b],  // O O O O
						[f,f,f,f],	// X X X X
					]
				},
				// ...
			];
			////////////////////////////////////
			////////////////////////////////////


			////////////////////////////////////////////////////////////////////////
			////////////////////////////////////////////////////////////////////////
			// End shape properties

			console.log(this.level, this.shape);

		},

		ready: function () {

		},

		step: function (dt) {

			var that = this;

			this.timeSinceMoved += dt;

			if (!this.shape.currentShape) {
				this.shape.addShape();
			}

			if ( this.timeSinceMoved >= this.settings.gameSpeed ) {
				this.timeSinceMoved = 0;
				this.shape.moveDown();
				this.level.reDrawLevel();
			}

		},

		render: function (dt) {

			var that = this;

			this.layer.clear('#333');

			this.level.renderLevel();

			// this.layer.fillRect(x,y,w,h);

		},

		mousedown: function (data) {

			var that = this;

		},

		keydown: function (event) {

			var that = this;

			if (event.key === 'space') {

			}
		}
	});
};