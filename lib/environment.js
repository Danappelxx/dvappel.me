// general configuration

String.prototype.endsWith = function(suffix) {
	return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

String.prototype.startsWith = function (str){
	return this.indexOf(str) === 0;
};

String.prototype.capFirstLetter = function () {
	return this.charAt(0).toUpperCase() + this.slice(1);
};