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
		var CLIENT_ID = '79230b378d429cea8d72';
		var CLIENT_SECRET = '315acf45721ff9aa756dc8fc9b19de036a668852';

		if(baseUrl.endsWith('?ref=master')) {
			baseUrl += '&';
		} else {
			baseUrl += '?';
		}

		var fullUrl = baseUrl + 'client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET;
		return fullUrl;
	}
});