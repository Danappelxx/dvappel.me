Controller('todolists', {
	helpers: {
		todolists: function () {

			if(! Session.get('currTodolistStack')) {
				return Todolists.find({hasFather: false}, {limit: 1}).fetch()
			} else {
				return Session.get('currTodolistStack');
			}
		}
	},
	events: {

	},
});

Controller('newTask', {
	events: {
		'submit .new-task': function (event) {

			event.preventDefault();

			var itemName = event.target.text.value,
				isList = event.target.checkbox.checked;

			Meteor.call('newTask', itemName, isList, this, function (error, result) {
				if (!error) {
					console.log(result);
				}
			});

			return false;
		}
	}
});

Controller('todolistItem', {
	events: {
		'click .new-task': function (event) {

			event.preventDefault();

			console.log(this);

			Meteor.call('removeTask', this, function (error, result) {
				if (!error) {
					console.log(result);
				}
			});

			return false;
		},
		'click .select-list': function (event) {

			var self = this;

			event.preventDefault();

			var currStack = Session.get('currTodolistStack');

			console.log(currStack);


			currStack = [];

			var addParentToStack = function (parent) {
				currStack.unshift(parent);

				if(parent.hasFather) {
					addParentToStack( Todolists.findOne({'_id': parent.fatherId}) );
				}
			};


			addParentToStack( Todolists.findOne(self.listId) );

			console.log(currStack);
			// currStack.unshit();


			Session.set('currTodolistStack', currStack);

			return false;
		}
	}
});

Tracker.autorun(function () {
	var currStack = Session.get('currTodolistStack');
	// Session.get('currTodolistStack');

	if(currStack) {
		currStack.forEach( function (currItem, index) {
			if (! currItem) {
				currStack.splice(index, 1);
			} else {
				var newItem = Todolists.findOne({_id: currItem._id});
				if (! newItem) {
					currStack[index] = newItem;
				} else if (currItem.items !== newItem.items) {
					currStack[index] = newItem;
				}
			}
		});

		Session.set('currTodolistStack', currStack);
	}
});