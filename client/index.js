// toplevel html's JS

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
