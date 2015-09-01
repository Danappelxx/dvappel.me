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
	// this is lame. I should figure out how to do this without session variables (promises, maybe?)
	projectList: function () {
		return 	[
			{
				"title": "(This website) Dvappel.me",
				"link": "home",
				"madeUsing": [
					"Meteor.js",
					"nGINX",
					"SCSS",
					"Bootstrap",
				],
				"github_link": "https://github.com/danappelxx/dvappel.me",
				"footnote": "It's literally what you're seeing right now"
			},
			{
				"title": "An iOS app (on the app store!), Squad",
				"link": "http://squadapp.io/",
				"madeUsing": [
					"Swift",
					"Parse",
					"Plivo (Twilio competitor)",
					"Node.js"
				],
				"github_link": "#",
				"footnote": "Not open sourced, sorry!"
			},
			{
				"title": "A MongoDB interface for Swift",
				"link": "https://cocoapods.org/pods/SwiftMongoDB",
				"madeUsing": [
					"Swift 2.0",
					"Mongo-C-Driver",
					"Cocoapods"
				],
				"github_link": "https://github.com/Danappelxx/SwiftMongoDB",
				"footnote": "Currently in active development!"
			},
			{
				"title": "A chatroom with moderator features",
				"link": "chatroom",
				"madeUsing": [
					"Meteorjs",
					"Javascript",
					"juliancwirko:s-alert"
				],
				"github_link": "https://github.com/Danappelxx/dvappel.me/tree/master/client/views/chatroom",
				"footnote": "Scroll down to see it in action!"
			},
			{
				"title": "Github line-of-code counter",
				"link": "gitlinecounter",
				"madeUsing": [
					"Github API",
					"Javascript",
					"Meteor.js"
				],
				"github_link": "https://github.com/Danappelxx/dvappel.me/tree/master/client/views/gitlinecount",
				"footnote": "Counts public accounts and their repositories"
			},
			{
				"title": "Micro Instagram Client for the Pebble",
				"link": "https://github.com/Danappelxx/Pebble-Flip",
				"madeUsing": [
					"Instagram API",
					"Pebble sdk",
					"Pebble-JS",
					"Python",
					"C"
				],
				"github_link": "https://github.com/Danappelxx/Pebble-Flip",
				"footnote": "Abandoned and full of memory leaks :P"
			},
			{
				"title": "Event-based photo-sharing platform",
				"link": "http://danappelxx.github.io",
				"madeUsing": [
					"Objective-C",
					"Javascript",
					"Parse",
					"Bootstrap"
				],
				"github_link": "https://github.com/danappelxx/danappelxx.github.io",
				"footnote": "Won 1st place at <a href='http://hshacks2.challengepost.com'>HSHacksII</a> for 'First Time Hack'"
			}
		];
	}
});