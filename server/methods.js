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
	}
});