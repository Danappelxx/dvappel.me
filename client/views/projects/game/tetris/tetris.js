Template.tetris.rendered = function () {

	var container = document.getElementById("tetris-container");

	var app = new PLAYGROUND.Application({

		container: container,
		height: window.innerHeight * 0.7,
		// scale: 1,

		create: function () {

			var that = this;
		},

		ready: function () {

		},

		step: function (dt) {

			var that = this;
		},

		render: function (dt) {

			var that = this;
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