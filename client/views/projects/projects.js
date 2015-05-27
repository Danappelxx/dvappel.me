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

Meteor.call('getProjectList', function (error, result) {
	if (!error) {
		Session.set('projectList', result.projectList);
	}
});
Template.projectsProjectList.helpers({
	// this is lame. I should figure out how to do this without session variables (promises, maybe?)
	projectList: function () {
		return Session.get('projectList');
	},
	projectListLoaded: function () {
		if( typeof(Session.get('projectList')) === 'object') {
			return true;
		} else {
			return false;
		}
	}
});