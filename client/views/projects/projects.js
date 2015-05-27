// Easter egg

var egg = new Egg();

egg
	.AddCode("up,up,down,down,left,right,left,right,b,a", function() {
		alert("Eggs!");
		location.href = 'https://atmospherejs.com/danappelxx/eggjs';
	}, "easter-egg")
	.AddHook(function(){
		console.log("Hook called for: " + this.activeEgg.keys);
		console.log(this.activeEgg.metadata);
	}).Listen();

Template.projectListItem.helpers({
	isLink: function (url) {
		if ( url.startsWith('http://') || url.startsWith('https://') ) {
			return true;
		} else {
			return false;
		}
	}
});


Template.projectsProjectList.helpers({
	// In the future, make this a collection
	projectList: [
		{
			title: '(This website) Dvappel.me',
			link: 'home',
			madeUsing: [
				'Meteor.js',
				'SCSS',
				'Accounts-Github',
				'PhantomJS',
				'Bootstrap',
				'Hover.css',
			],
			github_link: 'https://github.com/danappelxx/dvappel.me',
			footnote: 'Also used to host some projects'
		},
		{
			title: 'Online collaborative code editor',
			link: 'codepad-base',
			madeUsing: [
				'Meteor.js',
				'Share.js',
				'Ace Editor',
			],
			github_link: '',
			footnote: ''
		},
		{
			title: 'Meteor-packaged wrapper for egg.js',
			link: 'https://atmospherejs.com/danappelxx/eggjs',
			madeUsing: [
				'Meteor.js',
				'Egg.js'
			],
			github_link: 'https://github.com/Danappelxx/meteor-eggjs/',
			footnote: 'Up Up Down Down Left Right Left Right B A'
		},
		{
			title: 'Github line-of-code counter',
			link: 'gitlinecounter',
			madeUsing: [
				'Github API',
				'Javascript',
				'Meteor.js',
			],
			github_link: '',
			footnote: 'Counts public accounts and their repositories'
		},
		{
			title: 'Instagram Client for the Pebble',
			link: 'https://github.com/Danappelxx/Pebble-Flip',
			madeUsing: [
				'Instagram API',
				'Pebble sdk',
				'Pebble-JS',
				'Python',
				'C',
			],
			github_link: 'https://github.com/Danappelxx/Pebble-Flip',
			footnote: ''
		},
		{
			title: 'RSS \'spreeder\' for the Pebble',
			link: 'https://github.com/Danappelxx/RSS-News-Spreeder',
			madeUsing: [
				'Pebble-JS',
				'Javascript',
				'Google Feed API (RSS ➔ JSON)'
			],
			github_link: 'ttps://github.com/Danappelxx/RSS-News-Spreeder',
			footnote: 'Reads all valid RSS and Atom feeds'
		},
		{
			title: 'Event-based photo-sharing platform',
			link: 'http://danappelxx.github.io',
			madeUsing: [
				'Objective-C',
				'Javascript',
				'Parse',
				'Bootstrap',
			],
			github_link: '',
			footnote: 'Won 1st place at HSHacksII for \'First Time Hack\''
		},
	],
});