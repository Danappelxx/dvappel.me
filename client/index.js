// toplevel html's JS

// EGGSAMPLE
var egg = new Egg();

egg
	.AddCode("up,up,down,down,left,right,left,right,b,a", function() {
		alert("Eggs!");
	}, "easter-egg")
	.AddHook(function(){
		console.log("Hook called for: " + this.activeEgg.keys);
		console.log(this.activeEgg.metadata);
	}).Listen();
