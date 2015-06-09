//	Todolists
// 		List
//			List Id
// 			List Name
// 			hasFather (bool)
// 			Father List's Id (can be null)
// 			Items
// 				isList (bool)
// 				List Id (can be null)
// 				Content (can be list name)

this.Todolists = new Mongo.Collection('todolists');