Template.gitlinecount.events({
	'click button': function () {

		var repoOwner = $('#repo-owner-input').val();
		var repoName = $('#repo-name-input').val();
		var repoRequestUrl = 'https://api.github.com/repos/' + repoOwner + '/' + repoName;
		var repoContentRequestUrl = repoRequestUrl + '/contents';

		var fileCount = 0;
		var files;
		Session.set('lineCount', 0);

		var countFile = function(file) {
			var download_url = file.download_url;
			Meteor.call('addFile', download_url);

			Meteor.call('addFile', download_url, function (error, result) {
				if(!error) {
					var currLineCount = Session.get('lineCount');
					var newLineCount = currLineCount + result;
					Session.set('lineCount', newLineCount);
				}
			});

			fileCount++;
		};

		var countDir = function (files) {

			files.forEach( function (file) {
				if (file.type == 'dir') {
					$.getJSON(file.url, countDir);
				} else if (file.type == 'file') {
					countFile(file);
				}
			});
		};

		$.getJSON(repoContentRequestUrl, countDir);
	}
});

Template.gitlinecount.helpers({
	currLineCount: function () {
		return Session.get('lineCount');
	}
});