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


// Template.projects.rendered = function () {
// 	$('.projectListItem').hover( function() {
// 		$(this).find('h2').toggleClass('float-hover');
// 	});
// };

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
			title: 'Instagram Client for the Pebble',
			link: 'https://github.com/Danappelxx/Pebble-Flip',
			madeUsing: [
				'Instagram API',
				'Pebble sdk',
				'Pebble-JS',
				'Python',
				'C',
			],
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
			footnote: ''
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
			footnote: 'Made at HSHacksII'
		},
		{
			title: '(This website) Dvappel.me',
			link: 'home',
			madeUsing: [
				'Meteor.js',
				'SCSS',
				'Accounts-Github',
				'PhantomJS',
				'Ryw:blog',
				'Bootstrap'
			],
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
			footnote: ''
		},
		{
			title: 'Meteor-packaged wrapper for egg.js',
			link: 'https://atmospherejs.com/danappelxx/eggjs',
			madeUsing: [
				'Meteor.js',
				'Egg.js'
			],
			footnote: ''
		},
		{
			title: 'Github line-of-code counter',
			link: 'gitlinecounter',
			madeUsing: [
				'Github API',
				'Javascript',
				'Meteor.js',
			],
			footnote: ''
		},

	],
});