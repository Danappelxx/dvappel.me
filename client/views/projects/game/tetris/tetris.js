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
					filled: ['#E5837C'],
				},
				gameSpeed: 5,// in seconds
				sideMoveDelay: 0.1, // in seconds
				downMoveDelay: 0.1, // in seconds
			};
			this.timeSinceMovedDown = 0;

			this.timeSincePlayerMovedDown = 0;
			this.timeSincePlayerMovedSide = 0;

			////////////////////////////////////////////////////////////////////////
			////////////////////	Construct level properties 	////////////////////
			////////////////////////////////////////////////////////////////////////

			this.level = {
				horizontal: 10,
				vertical: 20,
				hidden: 1,
				enum: {
					HIDDEN: 0,
					BLANK: 1,
					FILLED: 2,
					WHITESPACE: 3, // the empty area of the 4x4 of the tetris block - ignore it in collision detection
				},

				// null means that it is defined later
				levelMap: null, // LEVEL ARRAY IS Y,X INSTEAD OF X,Y FOR SIMPLICITY (OOPS)
				generateBlankLevel: null,
				renderLevel: null,
				reDrawLevel: null,
				checkRows: null,

				cellSpacingRatio: 0.1,
				cellWidth: null,
				cellHeight: null,
				cellSpacing: null,
				totalCellWidth: null,
				totalCellHeight: null,
				sidePadding: null,
				startingX: null,
				startingY: null,
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

			this.level.generateBlankLevel(this.level.horizontal, this.level.vertical, this.level.enum.BLANK); // generate starter level

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
				var fillColor = that.settings.fillStyle.filled[0];

				var currCell;
				level.forEach( function (row, arrY, levelArr) {

					y += totalCellHeight;

					row.forEach( function (cell, arrX, rowArr) {

						if ( cell === blank ) {
							that.layer.fillStyle(blankColor);
						}
						if ( cell === filled ) {
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

				that.level.generateBlankLevel(that.level.horizontal, that.level.vertical, that.level.enum.BLANK);
				// draw from scratch

				var level = that.level.levelMap;
				var levelHeight = that.level.vertical;

				var blank = that.level.enum.BLANK;
				var filled = that.level.enum.FILLED;
				var whitespace = that.level.enum.WHITESPACE;

				var drawSunkenShapes = function () {
					var sunkShapes = that.shape.sunkShapes;

					Session.set('sunkShapes', sunkShapes);
					Session.set('currentShape', that.shape.currentShape);
					sunkShapes.forEach( function (currentShape) {
						drawCurrentShape(currentShape);
					});
				};

				var drawCurrentShape = function (currentShape) {
					// console.log(currentShape);
					var startingX = currentShape.x;
					var startingY = currentShape.y;
					var endingX = currentShape.x + currentShape.width;
					var endingY = currentShape.y + currentShape.height;

					var diffY, diffX;
					for ( var y = startingY; y < endingY; y++) {

						diffY = y - startingY;
						for ( var x = startingX; x < endingX; x++) {

							diffX = x - startingX;

							if (level[y]) {
								if (currentShape.structure[diffY][diffX] === filled) {
									level[y][x] = filled;
								}
							}
						}
					}
				};

				drawSunkenShapes();

				if ( that.shape.currentShape ) {
					drawCurrentShape(that.shape.currentShape);
				}

			};

			////////////////////////////////////////////////////////////////////////
			////////////////////	Check for matches	 		////////////////////
			////////////////////////////////////////////////////////////////////////

			this.level.checkRows = function () {

				var level = that.level.levelMap;
				var filled = that.level.enum.FILLED;
				var blank = that.level.enum.BLANK;

				level.forEach( function (row, y) {

					var rowIsFull = row.every( function (cell, x) { // if all cells of roware filled...
						if ( cell === filled ) {
							return true;
						}
					});

					if ( rowIsFull ) {
						row.forEach( function (cell, index) { // clear all cells of row
							row[index] = blank;
						});
						that.shape.sunkShapes.sort( function (a,b) { return a.y < b.y; }).forEach( function (shape, index) { // move all shapes down
							shape.y++;
						});
					}

				});


			};

			this.level.shiftLevelDown = function () {

			};

			////////////////////////////////////////////////////////////////////////
			////////////////////////////////////////////////////////////////////////
			// End checking for full rows, shifting level down

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
				checkSink: null,
				sunkShapes: [],
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
					x: randInt(0, that.level.horizontal - currentShape.width) + currentShape.firstPointY - 1,
					y: 0 - currentShape.lastPointY,
					checkSink: checkSink,
					sink: sinkShape,
				});

				that.shape.currentShape = currentShape;
			};

			////////////////////////////////////
			//	Check if shape should be sunk //
			////////////////////////////////////

			var checkSink = function () {

				var level = that.level;
				var levelMap = level.levelMap;
				var levelHeight = level.vertical - 1; // - 1 because it is an array length
				var lowestY = that.shape.currentShape.lastPointY;
				var currY = that.shape.currentShape.y;
				var currX = that.shape.currentShape.x;
				var shapeWidth = that.shape.currentShape.width;
				var collisionPointY = lowestY + currY;

				var structureY = collisionPointY - currY;

				var filled = that.level.enum.FILLED;

				console.log('coordinates:', currX, currY);
				console.log('level map:');
				console.log(levelMap[collisionPointY - 2]);
				console.log(levelMap[collisionPointY - 1]);
				console.log(levelMap[collisionPointY    ]);
				console.log(levelMap[collisionPointY + 1]);

				// console.log(that.shape.currentShape.structure[structureY]);
				// console.log(currX - 1, that.shape.currentShape.structure[structureY][shapeWidth - currX]);
				// console.log(currX, shapeWidth);

				// is at bottom
				if ( collisionPointY === levelHeight) {
					that.shape.currentShape.sink();
					that.level.checkRows(); // checks each row, then if full then clears it
				}
				else {

					console.log('structure:');

					that.shape.currentShape.structure.forEach( function (row, shapeX, structure) {

						row.forEach( function (cell, shapeY, structureRow) {
							// ...
						});

						console.log(row);

					}) ;


				// 	for ( var x = currX; x < shapeWidth; x++ ) {

				// 		var structureX = x - currX;

				// 		if ( levelMap[collisionPointY + 1][x] === filled && // spot below is filled
				// 			that.shape.currentShape.structure[structureY][structureX] === filled) { // spot is filled

				// 				that.shape.currentShape.sink();
				// 				console.log('collision');
				// 		}
				// 	}
				// 	that.level.checkRows(); // checks each row, then if full then clears it
				// }

				// How this works:
				// 1. loop through the shape's structure
				// 2. in the loop, also find the corresponding coordinates on the level map
				// 3. if current cell in shape is filled, look ONE cell below said cell on the LEVEL MAP
				// 4. if said cell (the one below the current cell) is also filled, sink the shape
				// 5. repeat for all cells in the shape's structure

				}
				console.log('\n\n');
			};

			////////////////////////////////////
			//	Sink shape                    //
			////////////////////////////////////

			// gets bound to currentShape
			var sinkShape = function () {
				var currentShapeCopy = $.extend(true, {}, that.shape.currentShape); // jquery for deep copy
				that.shape.sunkShapes.push(currentShapeCopy); // sink the current shape
				that.shape.currentShape = null; // remove the current shape (it will get added in 'step')
			};

			////////////////////////////////////
			//	Shape movement		 	   	  //
			////////////////////////////////////

			this.shape.moveDown = function () {
				that.shape.currentShape.y += 1;
				console.log('current y:', that.shape.currentShape.y);

				that.shape.currentShape.checkSink();
			};

			this.shape.moveLeft = function () {
				// check that moving it to the left won't move it off screen
				if ( that.shape.currentShape.x - 1 > ( 0 - that.shape.currentShape.firstPointX ) ) {
					that.shape.currentShape.x -= 1;
				} else {
					// play blocking sound
				}
			};

			this.shape.moveRight = function () {
				// check that moving it to the right won't move it off screen
				if ( that.shape.currentShape.x + 1 < ( that.level.horizontal - that.shape.currentShape.firstPointX ) - 1 ) {
					that.shape.currentShape.x += 1;
				} else {
					// play blocking sound
				}
			};

			////////////////////////////////////
			//	Define shapes		 	      //
			////////////////////////////////////
			var b = this.level.enum.BLANK;
			var f = this.level.enum.FILLED;
			var w = this.level.enum.WHITESPACE;
			this.shape.shapeTypes = [
				{
					width: 5,
					height: 5,

					firstPointY: 2,
					firstPointX: 2,
					lastPointY: 2,
					lastPointX: 4,

					structure: [
						[w,w,w,w,w],	// O O O O O
						[w,w,f,w,w],	// O O X O O
						[w,f,f,f,w],	// O X X X O
						[w,w,w,w,w],	// O O O O O
						[w,w,w,w,w],	// O O O O O
					]
				},
				// {
				// 	width: 5,
				// 	height: 5,

				// 	firstPointY: 3,
				// 	firstPointX: 1,
				// 	lastPointY: 3,
				// 	lastPointX: 5,

				// 	structure: [
				// 		[w,w,w,w,w],	// O O O O O
				// 		[w,w,w,w,w],	// O O O O O
				// 		[f,f,f,f,f],	// X X X X X
				// 		[w,w,w,w,w],	// O O O O O
				// 		[w,w,w,w,w],	// O O O O O
				// 	]
				// },
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

			this.timeSinceMovedDown += dt;
			this.timeSincePlayerMovedSide += dt;
			this.timeSincePlayerMovedDown += dt;

			if (!this.shape.currentShape) {
				this.shape.addShape();
			}

			if ( this.timeSinceMovedDown >= this.settings.gameSpeed ) {
				this.timeSinceMovedDown = 0;
				this.shape.moveDown();
			}


			// keypress detection

			if ( this.timeSincePlayerMovedDown > this.settings.downMoveDelay ) {
				if ( this.keyboard.keys.space || this.keyboard.keys.down ) {
					that.shape.moveDown();
				}

				this.timeSincePlayerMovedDown = 0;
			}

			if ( this.timeSincePlayerMovedSide > this.settings.sideMoveDelay ) {


				if ( this.keyboard.keys.left ) {
					that.shape.moveLeft();
				}
				if ( this.keyboard.keys.right ) {
					that.shape.moveRight();
				}

				this.timeSincePlayerMovedSide = 0;
			}


			this.level.reDrawLevel(); // clears the level, then fills in the level map with shapes
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

		// keydown: function (event) {

		// 	var that = this;

		// 	if ( event.key === 'space' ) {

		// 	}
		// 	if ( event.key === 'left' ) {
		// 		that.shape.moveLeft();
		// 	}

		// 	if ( event.key === 'right' ) {
		// 		that.shape.moveRight();
		// 	}
		// }
	});
};