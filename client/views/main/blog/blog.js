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
		if ( window.location.pathname === '/blog') {
			document.title = 'Dan Appel | ' + 'Blog';
		}
	},
});

Controller('showBlogTemplate', {
	rendered: function () {
		if ( window.location.pathname !== '/') {
			document.title = 'Dan Appel | ' + document.title;
		}
	},
});