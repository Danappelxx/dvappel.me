Template.gitlinecount.events({
	'click button': function () {

		var files;
		Session.set('lineCount', 0);

		var countFile = function(file) {
			var download_url = file.download_url;

			Meteor.call('addFile', download_url, function (error, result) {
				if(!error) {
					var currLineCount = Session.get('lineCount');
					var newLineCount = currLineCount + result;
					Session.set('lineCount', newLineCount);
					countedFiles++;
					Session.set('percentCounted', Math.round((countedFiles/numFiles) * 100));
				}
			});

		};

		var countDir = function (files) {

			numFiles += files.length;

			files.forEach( function (file) {
				if (file.type == 'dir') {
					Meteor.call('appendGithubClientStuffs', file.url, function (error, result) {
						$.getJSON(result, countDir);
					});
					countedFiles++;
				} else if (file.type == 'file') {
					countFile(file);
				}
			});
		};

		var countRepos = function (repos) {
			repos.forEach(function (repo) {
				var repoUrl = repo.contents_url.split('/{+path}')[0];
				Meteor.call('appendGithubClientStuffs', repoUrl, function (error, result) {
					$.getJSON(result, countDir);
				});
			});
		};


		var repoOwner = $('#repo-owner-input').val();
		var repoName = $('#repo-name-input').val();

		var repoRequestUrl;

		var numFiles = 0;
		var countedFiles = 0;


		Session.set('isCounting', true);
		Session.set('percentCounted', 0);

		if( repoName === '') {
			// No repository name -> count all repositories

			repoRequestUrl = 'https://api.github.com/users/' + repoOwner + '/repos';
			Meteor.call('appendGithubClientStuffs', repoRequestUrl, function (error, result) {
				$.getJSON(result, countRepos);
			});
		} else {
			// Yes repository name -> count just this repository

			repoRequestUrl = 'https://api.github.com/repos/' + repoOwner + '/' + repoName;
			var repoContentRequestUrl = repoRequestUrl + '/contents';
			Meteor.call('appendGithubClientStuffs', repoContentRequestUrl, function (error, result) {
				$.getJSON(result, countDir);
			});
		}
	}
});

Template.gitlinecount.helpers({
	currLineCount: function () {
		return Session.get('lineCount');
	},
	isCounting: function () {
		return (Session.get('percentCounted') < 100);
	},
	percentCounted: function () {
		return Session.get('percentCounted');
	}
});

Template.gitlinecount.rendered = function () {
	$('#repo-name-input').tooltip({'trigger':'focus'});
	// , 'title': 'You can leave this blank to get the number of lines in the whole account.'});
};