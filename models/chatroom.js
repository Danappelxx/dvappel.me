// Right now, it's just one chat room with a ton of messages:
// 	Chat room
// 		Messages
// 			Message Content
// 			Username
// 			User id
// 			Timestamp

// What I want is something like:
// Chat rooms
// 		Chat Room
// 			Messages
// 				Message Content
// 				Username
// 				User id
// 				Timestamp
// 			Users online?
// 				Username
// 				User id

// OR

// Chat rooms
// 		Chat room
// 			Room Id
// 			Users
// Messages
// 		Message
// 			Message content
// 			Room Id
// 			Username
// 			User Id
// 			Timestamp

// Probably going to go with the first method - seems simpler (and more efficient?)

this.Chatrooms = new Mongo.Collection('chatrooms');

this.Messages = new Mongo.Collection('messages');