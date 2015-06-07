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

this.Chatrooms = new Mongo.Collection('chatrooms');

this.Messages = new Mongo.Collection('messages');