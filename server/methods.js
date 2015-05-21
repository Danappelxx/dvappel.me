// Meteor.method definitions
Meteor.methods({
	addFile: function (fileUrl) {
		this.unblock();

		// var Future = Npm.require("fibers/future");
		// var f = new Future();

		// HTTP.get(fileUrl, {timeout:3000}, function (error, result) {

			// var currLineCount = Session.get('lineCount');
			// var newLineCount = result.content.split('\n').length;
			// var totalLineCount = currLineCount + newLineCount;

			// ServerSession.set('lineCount', totalLineCount);

			// f.return(response);
			// var rawFile = response.content;
			// var lineCount = rawFile.split('\n').length;
			// // var currLineCount = Session.get('lineCount');
			// // var newLineCount = currLineCount + lineCount;
			// return lineCount;
			// // Session.set('lineCount', newLineCount);
		// });

		var lineCount;

		try {

			var result = HTTP.get(fileUrl);

			lineCount = result.content.split('\n').length;

		} catch (e) {
			return false;
		}

		return lineCount;

		// return f.wait();
	}
});

		// try {
		// 	var response = HTTP.get(fileUrl, {timeout: 3000});


		// 	lineCount = 20;
		// 	return lineCount;

		// } catch (e) {
		// 	return 1;
		// }