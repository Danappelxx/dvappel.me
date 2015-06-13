Controller('blogIndexPost', {
	helpers: {
		buildUrl: function (slug) {
			return '/blog/' + slug;
		},
		beautifyTime: function (time) {
			console.log(time);
			return moment(time).format('MMMM Do, YYYY');
		}
	},
	rendered: function () {
		document.title = 'Dan Appel | ' + document.title;
	},
});

Controller('showBlogTemplate', {
	rendered: function () {
		document.title = 'Dan Appel | ' + document.title;
	},
});