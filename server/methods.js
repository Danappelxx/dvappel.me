// Meteor.method definitions
Meteor.methods({
	addFile: function (fileUrl) {
		this.unblock();
		var lineCount;

		try {

			var result = HTTP.get(fileUrl);

			lineCount = result.content.split('\n').length;

		} catch (e) {
			return false;
		}

		return lineCount;
	},
	appendGithubClientStuffs: function (baseUrl) {

		if(baseUrl.endsWith('?ref=master')) {
			baseUrl += '&';
		} else {
			baseUrl += '?';
		}

		var fullUrl = baseUrl + 'client_id=' + GITLINECOUNTER_CLIENT_ID + '&client_secret=' + GITLINECOUNTER_CLIENT_SECRET;
		return fullUrl;
	},
	getProjectList: function () {
		return JSON.parse(Assets.getText('projects.json'));
	}
});