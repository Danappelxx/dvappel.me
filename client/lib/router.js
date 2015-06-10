Router.configure({
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	layoutTemplate: 'layout',
	fastRender: true,
	onAfterAction: function () {
		document.title = 'Dan Appel | ' + this.route.getName().capFirstLetter();
	},
});

Router.map(function () {

	// Base site
	this.route('home', {
		path: '/'
	});
	this.route('projects', {
		path: '/projects',
		template: 'projects'
	});
	this.route('about', {
		path: '/about',
		template: 'about-page'
	});
	this.route('contact', {
		path: '/contact',
		template: 'contact-page'
	});
	this.route('admin', {
		path: '/admin',
		template: 'accountsAdmin',
		onBeforeAction: function() {
			if(Meteor.loggingIn()) {
				this.render(this.loadingTemplate);
				this.next();
			} else if(Roles.userIsInRole(Meteor.user(), ['admin'])) {
				this.next();
			} else {
				this.redirect('/');
				this.next();
			}
		}
	});


	// // Codepad
	this.route('codepad-base', {
		path: '/codepad',
		template: 'codepadBase',
		data: {
			randDocid : function () {
				var randDocid = Random.id(5);
				return randDocid;
			}
		}
	});
	this.route('codepad', {
		path: '/codepad/:padid',
		template: 'codepad',
		onBeforeAction: function () {
			var padid = this.params.padid;
			Session.set('padid', padid);
			this.next();
		}
	});

	// Github line counter
	this.route('gitlinecounter', {
		path: '/gitlinecounter',
		template: 'gitlinecount'
	});

	// Chatroom
	this.route('chatroom', {
		path: '/chatroom',
		template: 'chatroom'
	});

	// Todolists
	this.route('todolists', {
		path: '/todolists',
		template: 'todolists',
	});



	// Games
	this.route('games', {
		path: '/games',
		template: 'games-page'
	});

	this.route('flappy-square', {
		path: '/flappy',
		template: 'flappy-square'
	});
});